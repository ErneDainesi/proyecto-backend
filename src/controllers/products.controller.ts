import {Request, Response} from "express";
import {ProductsDao} from '../database/products/productsDao';

const productDao = new ProductsDao();

export const getProductsPage = (req: Request, res: Response) => {
	res.render('pages/productos');
};

export const getProductsView = async (req: Request, res: Response) => {
	try {
		const products = await productDao.getAllProducts(null);
		const productCount = await productDao.amountOfProducts();
		res.render("pages/vista", {
			products,
			thereAreProducts: productCount && productCount > 0
		});
	} catch (err) {
		res.status(404).json({error: 'no products were found'});
	}
};

export const getProductsFromCategory = async (req: Request, res: Response) => {
	try {
		const products = await productDao.getAllProducts(req.params.category);
        if (products.length < 1) {
            res.send({error: "there are no products in that category"});
            return;
        }
		res.send(products);
	} catch (err) {
		res.status(404).json({error: 'no products were found with that category'});
	}
};

export const getProduct = async (req: Request, res: Response) => {
	const idProduct: string = req.params.id;
	try {
		const productMongo = await productDao.getProduct(idProduct, null);
		res.json(productMongo);
	} catch (err) {
		res.status(404).json({error: 'product not found'});
	}
};

export const saveProduct = (req: Request, res: Response) => {
	const product = {...req.body};
	try {
		productDao.insertProduct(product);
		res.redirect('/products');
	} catch (err) {
		res.status(500).json({error: "couldn't save product"});
	}
};

export const updateProduct = (req: Request, res: Response) => {
	try {
		const id: string = req.params.productId;
		const updatedProduct = productDao.updateProduct(id, req.body);
		res.send(updatedProduct);
	} catch (err) {
		res.status(500).json({error: "couldn't update product"});
	}
};

export const deleteProduct = (req: Request, res: Response) => {
	try {
		const productId: string = req.params.productId;
		const deletedProduct = productDao.deleteProduct(productId);
		res.status(200).send(deletedProduct);
	} catch (err) {
		res.status(500).json({error: "couldn't delete product"});
	}
};
