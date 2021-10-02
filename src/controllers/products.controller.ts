import { Request, Response } from "express";
import {overwriteFile} from '../lib/utilities';

const FILE_NAME = "./products.json";
const products: Object[] = [];

export const getProductsPage =  (req: Request, res: Response) => {
	res.render('pages/productos');
};

export const getProductsView = (req: Request, res: Response) => {
	res.render("pages/vista", {
		products,
		thereAreProducts: products.length > 0
	});
};

export const getProduct = (req: Request, res: Response) => {
	const idProducto: number = +req.params.id;
	if (!products[idProducto - 1]) {
		res.json({error: 'producto no encontrado'})
	} else {
		res.json(products[idProducto - 1]);
	}
};

export const saveProduct = (req: Request, res: Response) => { 
	console.log("POST");
	const product: Object = {
		...req.body,
		timeStamp: Date.now(),
		code: products.length + 1,
		id: products.length + 1
	};
	products.push(product);
	overwriteFile(FILE_NAME, products);
	res.redirect('/products');
};

export const updateProduct = (req: Request, res: Response) => {
	const id: number = +req.params.productId;
	products[id - 1] = req.body;
	overwriteFile(FILE_NAME, products);
	res.send(products[id - 1]);
};

export const deleteProduct = (req: Request, res: Response) => {
	const productId: number = +req.params.productId;
	const deletedProduct = products.splice(productId - 1, 1);
	overwriteFile(FILE_NAME, products);
	res.send(deletedProduct[0]);
};