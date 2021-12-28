import {buildSchema} from "graphql";
import {
	getProduct,
	getProducts,
	updateProduct,
	saveProduct,
	deleteProduct
} from '../controller/products.controller'

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

export const root = {
	product: getProduct,
	products: getProducts,
	updateProduct: updateProduct,
	deleteProduct: deleteProduct,
	saveProduct: saveProduct
};

