import logger from "../../logger/winston";
import {MongoDatabase} from "../../database/mongodb/MongoDatabase";
import {IProduct} from "../../schemas/productsSchema";

const mongodb: MongoDatabase = MongoDatabase.Instance;

export const getProduct = (args: any) => {
	try {
		const {id} = args;
		return mongodb.getProduct(id, null);
	} catch (err) {
		logger.error(err);
	}
};

export const getProducts = () => {
	try {
		return mongodb.getAllProducts();
	} catch (err) {
		logger.error(err);
	}
};

export const updateProduct = (args: any) => {
	try {
		const {id, name, description, stock, price} = args;
		const newValue = {
			name,
			description,
			stock,
			price
		}
		return mongodb.updateProduct(id, newValue as IProduct);
	} catch (err) {
		logger.error(err);
	}
};

export const saveProduct = (args: any) => {
	try {
		const product = {...args};
		return mongodb.insertProduct(product as IProduct);
	} catch (err) {
		logger.error(err);
	}
};

export const deleteProduct = (id: string) => {
	try {
		return mongodb.deleteProduct(id);
	} catch (err) {
		logger.error(err);
	}
};

