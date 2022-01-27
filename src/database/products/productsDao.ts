import productsSchema, {IProduct} from "./products.schema";
import logger from '../../logger/winston';
import {MongoDatabase} from "../db/MongoDatabase";
import {
	DB_FAILED_GET,
	DB_FAILED_DELETE,
	DB_FAILED_UPDATE,
	DB_FAILED_INSERT,
	INVALID_FILTER
} from '../../constants';

export class ProductsDao {
	constructor() {
		MongoDatabase.Instance.connect();
	}

	public async getAllProducts(category: string) {
		try {
            let products;
            if (category) {
                products = await productsSchema.find({category});
            } else {
                products = await productsSchema.find();
            }
			return products;
		} catch (err) {
			logger.error(`[${DB_FAILED_GET}] | ${err}`);
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
			throw new Error(DB_FAILED_GET);
		}
	}

	public async insertProduct(product: IProduct) {
		const newProduct = new productsSchema(product);
		try {
			const product = await newProduct.save();
			return product;
		} catch (err) {
			logger.error(`[${DB_FAILED_INSERT}] | ${err}`);
		}
	}

	public async deleteProduct(args: any) {
		try {
			const {id} = args;
			const deletedProduct = await productsSchema.deleteOne({id});
			return deletedProduct;
		} catch (err) {
			logger.error(`[${DB_FAILED_DELETE}] | ${err}`);
		}
	}

	public async updateProduct(id: string, product: IProduct) {
		try {
			const updatedProduct = await productsSchema.updateOne({id}, {$set: {...product}});
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
}

