import {Request, Response} from 'express';
import { CartDao } from '../database/cart/cartDao';
import { IProduct } from '../database/products/products.schema';
import { ProductsDao } from '../database/products/productsDao';

const cartDao: CartDao = new CartDao();
const productDao: ProductsDao = new ProductsDao();

export const getCart = async (req: Request, res: Response) => {
    const userEmail: string = req.session.user.email;
	const cart = await cartDao.getCart(userEmail);
	res.send(cart);
};

export const getProductFromCart = async (req: Request, res: Response) => {
    const product = await cartDao.getProduct(req.params.idProduct, req.session.user.email);
    res.send(product);
};

export const addProductToCart = async (req: Request, res: Response) => {
    const product = await productDao.getProduct(req.params.idProduct, null);
	await cartDao.addToCart(product as IProduct, req.session.user.email);
	res.send(product);
};

export const removeProductFromCart = async (req: Request, res: Response) => {
    const updatedCart = await cartDao.removeFromCart(req.params.idProduct, req.session.user.email);
    res.send(updatedCart);
};

