import {Request, Response} from 'express';
import {Cart} from '../models/Cart';

const carts: Cart[] = [];

export const creatNewCart = (req: Request, res: Response) => {
	const cart: Cart = new Cart(carts.length + 1, Date.now());
	carts.push(cart);
	res.send('<h1>Cart</h1>');
};

export const getProduct = (req: Request, res: Response) => {
	const idProduct = req.params.idProduct ? +req.params.idProduct : false;
	const idCart: number = +req.params.idCart;
	const selectedCart: Cart = carts[idCart - 1];
	if (idProduct) {
		res.send(selectedCart.getProduct(idProduct));
	} else {
		res.send(selectedCart.cartProducts());
	}
};

export const saveProduct = (req: Request, res: Response) => {
	const product: Object = {
		...req.body,
		id: +req.params.idProduct,
		timeStamp: Date.now()
	};
	const cart: Cart = carts[+req.params.idCart - 1];
	cart.addToCart(product);
	res.json(product);
};

export const deleteProduct = (req: Request, res: Response) => {
	const productId: number = +req.params.idProduct;
	const cart: Cart = carts[+req.params.idCart - 1];
	const deletedProduct: Object = cart.removeFromCart(productId);
	res.send(deletedProduct);
};
