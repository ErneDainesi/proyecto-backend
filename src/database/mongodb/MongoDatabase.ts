import mongoose, { mongo } from 'mongoose';
import productsSchema, { IProduct } from '../../schemas/mongodb/productsSchema';
import {
    MONGODB_URL,
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
            await mongoose.connect(MONGODB_URL, {});
            console.log("Connection to mongo database was established");
        } catch(err) {
            console.error(err);
            throw new Error(DB_FAILED_CONNECTION);
        }
    }

    public async getAllProducts() {
        try {
            const products = await productsSchema.find();
            return products;
        } catch (err) {
            console.error(err);
            throw new Error(DB_FAILED_GET);
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
                throw new Error(DB_FAILED_GET);
            }
            if (!filter) { return product }
            const filteredProduct = this.filterProduct(product, filter);
            if (!filteredProduct) {
                throw new Error(INVALID_FILTER);
            }
            return filteredProduct;
        } catch(err) {
            console.error(err);
            throw new Error(DB_FAILED_GET);
        }
    }

    public async insertProduct(product: IProduct) {
        const newProduct = new productsSchema(product);
        try {
            await newProduct.save();
        } catch(err) {
            console.error(err);
            throw new Error(DB_FAILED_INSERT);
        }
    }

    public async deleteProduct(id: string) {
        try {
            const deletedProduct = await productsSchema.deleteOne({id});
            return deletedProduct;
        } catch(err) {
            console.error(err);
            throw new Error(DB_FAILED_DELETE);
        }
    }

    public async updateProduct(id: string, product: IProduct) {
        try {
            const updatedProduct = await productsSchema.updateOne({id}, {product});
            return updatedProduct;
        } catch(err) {
            console.error(err);
            throw new Error(DB_FAILED_UPDATE);
        }
    }

    public async amountOfProducts() {
        try {
            const amount: number = await productsSchema.count();
            return amount;
        } catch (err) {
            console.error(err);
        }
    }
}
