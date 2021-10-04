import { Request, Response } from "express";
import { MongoDatabase } from "../database/mongodb/MongoDatabase";
import {overwriteFile} from '../lib/utilities';

const FILE_NAME = "./products.json";
const mongodb: MongoDatabase = new MongoDatabase();

export const getProductsPage =  (req: Request, res: Response) => {
	res.render('pages/productos');
};

export const getProductsView = async (req: Request, res: Response) => {
	try {
		const products = mongodb.getAllProducts();
		const productCount = await mongodb.amountOfProducts();
		res.render("pages/vista", {
			products,
			thereAreProducts: productCount ? productCount > 0 : false
		});
	} catch (err) {
		res.status(404).json({error: 'no products were found'});
	}
};

export const getProduct = (req: Request, res: Response) => {
	const idProduct: number = +req.params.id;
	try {
		const product = mongodb.getProduct(idProduct, null);
		res.json(product);
	} catch (err) {
		res.status(404).json({error: 'product not found'});
	}
};

export const saveProduct = (req: Request, res: Response) => { 
	const product = {...req.body};
	try {
		mongodb.insertProduct(product);
		res.redirect('/products');
	} catch (err) {
		res.status(500).json({error: "couldn't save product"});
	}
};

export const updateProduct = (req: Request, res: Response) => {
	try {
		const id: number = +req.params.productId;
		const updatedProduct = mongodb.updateProduct(id, req.body);
		res.send(updateProduct);
	} catch (err) {
		res.status(500).json({error: "couldn't update product"});
	}
};

export const deleteProduct = (req: Request, res: Response) => {
	try {
		const productId: number = +req.params.productId;
		const deletedProduct = mongodb.deleteProduct(productId);
		res.send(deletedProduct);
	} catch (err) {
		res.status(500).json({error: "couldn't delete product"});
	}
};