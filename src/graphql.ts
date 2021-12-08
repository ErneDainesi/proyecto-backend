import {buildSchema} from "graphql";
import logger from "./logger/winston";
import {MongoDatabase} from "./database/mongodb/MongoDatabase";
import {IProduct} from "./schemas/productsSchema";

export const schema = buildSchema(`
  type Query {
	  product(id: String): Product,
	  products: [Product]
  },
  type Mutation {
	  updateProduct(id: String!, name: String, description: String, stock: Int, price: Int): Product,
	  deleteProduct(id: String): Product,
	  saveProduct(name: String, description: String, stock: Int, price: Int): Product
  },
  type Product {
	  name: String,
	  description: String,
	  stock: Int,
	  price: Int
  }
`);

const mongodb: MongoDatabase = new MongoDatabase();

const getProduct = (args: any) => {
	try {
		const {id} = args;
		return mongodb.getProduct(id, null);
	} catch (err) {
		logger.error(err);
	}
};

const getProducts = () => {
	try {
		return mongodb.getAllProducts();
	} catch (err) {
		logger.error(err);
	}
};

const updateProduct = (args: any) => {
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

const saveProduct = (args: any) => {
	try {
		const product = {...args};
		return mongodb.insertProduct(product as IProduct);
	} catch (err) {
		logger.error(err);
	}
};

const deleteProduct = (id: string) => {
	try {
		return mongodb.deleteProduct(id);
	} catch (err) {
		logger.error(err);
	}
};

export const root = {
	product: getProduct,
	products: getProducts,
	updateProduct: updateProduct,
	deleteProduct: deleteProduct,
	saveProduct: saveProduct
};

