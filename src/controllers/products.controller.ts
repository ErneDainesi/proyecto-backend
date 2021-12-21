import {Request, Response} from "express";
import {MongoDatabase} from "../database/mongodb/MongoDatabase";

const mongodb: MongoDatabase = MongoDatabase.Instance;

export const getProductsPage = (req: Request, res: Response) => {
	res.render('pages/productos');
};

export const getProductsView = async (req: Request, res: Response) => {
	try {
		const products = await mongodb.getAllProducts();
		const productCount = await mongodb.amountOfProducts();
		res.render("pages/vista", {
			products,
			thereAreProducts: productCount && productCount > 0
		});
	} catch (err) {
		res.status(404).json({error: 'no products were found'});
	}
};

export const getProduct = async (req: Request, res: Response) => {
	const idProduct: string = req.params.id;
	try {
		const productMongo = await mongodb.getProduct(idProduct, null);
		res.json(productMongo);
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
		const id: string = req.params.productId;
		const updatedProduct = mongodb.updateProduct(id, req.body);
		res.send(updatedProduct);
	} catch (err) {
		res.status(500).json({error: "couldn't update product"});
	}
};

export const deleteProduct = (req: Request, res: Response) => {
	try {
		const productId: string = req.params.productId;
		const deletedProduct = mongodb.deleteProduct(productId);
		res.status(200).send(deletedProduct);
	} catch (err) {
		res.status(500).json({error: "couldn't delete product"});
	}
};
