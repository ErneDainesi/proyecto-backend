import mongoose from 'mongoose';
import productsSchema, {IProduct} from '../../schemas/productsSchema';
import UserSchema, {User} from '../../schemas/User.schema';
import logger from '../../logger/winston';
import {
	DB_FAILED_CONNECTION,
	DB_FAILED_GET,
	DB_FAILED_DELETE,
	DB_FAILED_UPDATE,
	DB_FAILED_INSERT,
	INVALID_FILTER
} from '../../constants';

export class MongoDatabase {

	public static async connect() {
		try {
			const uri: string = process.env.ATLAS_URI as string;
			await mongoose.connect(uri, {});
			logger.info("Connection to mongo database was established");
		} catch (err) {
			logger.error(`[${DB_FAILED_CONNECTION}] | ${err}`);
		}
	}

	public async getAllProducts() {
		try {
			const products = await productsSchema.find();
			return products;
		} catch (err) {
			logger.error(`[${DB_FAILED_GET}] | ${err}`);
		}
	}

	private filterProduct(product: IProduct, filter: string) {
		switch (filter) {
			case "name":
				return product.name;
			case "description":
				return product.description;
			case "stock":
				return product.stock;
			case "price":
				return product.price;
			default:
				break;
		}
	}

	public async getProduct(id: string, filter: string | null) {
		try {
			const product: IProduct | null = await productsSchema.findById(id);
			if (!product) {
				logger.error(DB_FAILED_GET);
				return;
			}
			if (!filter) {return product}
			const filteredProduct = this.filterProduct(product, filter);
			if (!filteredProduct) {
				logger.error(INVALID_FILTER);
			}
			return filteredProduct;
		} catch (err) {
			logger.error(`[${DB_FAILED_GET}] | ${err}`);
		}
	}

	public async insertProduct(product: IProduct) {
		const newProduct = new productsSchema(product);
		try {
			await newProduct.save();
		} catch (err) {
			logger.error(`[${DB_FAILED_INSERT}] | ${err}`);
		}
	}

	public async deleteProduct(id: string) {
		try {
			const deletedProduct = await productsSchema.deleteOne({id});
			return deletedProduct;
		} catch (err) {
			logger.error(`[${DB_FAILED_DELETE}] | ${err}`);
		}
	}

	public async updateProduct(id: string, product: IProduct) {
		try {
			const updatedProduct = await productsSchema.updateOne({id}, {product});
			return updatedProduct;
		} catch (err) {
			logger.error(`[${DB_FAILED_UPDATE}] | ${err}`);
		}
	}

	public async amountOfProducts() {
		try {
			const amount: number = await productsSchema.count();
			return amount;
		} catch (err) {
			logger.error(err);
		}
	}

	public async insertUser(user: User) {
		const newUser = new UserSchema(user);
		try {
			await newUser.save();
		} catch (err) {
			logger.error(`[${DB_FAILED_INSERT}] | ${err}`);
		}
	}
}

