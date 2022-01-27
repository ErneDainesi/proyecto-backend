import logger from "../../logger/winston";
import {ProductsDao} from '../../database/products/productsDao';
import {IProduct} from '../../database/products/products.schema';

const productDao: ProductsDao = new ProductsDao();

export const getProduct = (args: any) => {
	try {
		const {id} = args;
		return productDao.getProduct(id, null);
	} catch (err) {
		logger.error(err);
	}
};

export const getProducts = () => {
	try {
		return productDao.getAllProducts(null);
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
		return productDao.updateProduct(id, newValue as IProduct);
	} catch (err) {
		logger.error(err);
	}
};

export const saveProduct = (args: any) => {
	try {
		const product = {...args};
		return productDao.insertProduct(product as IProduct);
	} catch (err) {
		logger.error(err);
	}
};

export const deleteProduct = (id: string) => {
	try {
		return productDao.deleteProduct(id);
	} catch (err) {
		logger.error(err);
	}
};

