import mongoose, { mongo } from 'mongoose';
import productsSchema, { IProduct } from '../../schemas/mongodb/productsSchema';
import { MONGODB_URL } from '../../constants';

export class MongoDatabase {

    public static async connect() {
        try {
            await mongoose.connect(MONGODB_URL, {});
            console.log("Connection to mongo database was established");
        } catch(err) {
            console.error(err);
        }
    }

    public async getProduct(id: number) {
        try {
            const message = await productsSchema.findById(id);
            return message;
        } catch(err) {
            throw new Error();
        }
    }

    public async insertProduct(product: IProduct) {
        const newProduct = new productsSchema(product);
        try {
            await newProduct.save();
        } catch(err) {
            throw new Error();
        }
    }

    public async deleteProduct(id: number) {
        try {
            const deletedProduct = await productsSchema.deleteOne({id});
            return deletedProduct;
        } catch(err) {
            throw new Error();
        }
    }

    public async updateProduct(id:number, product: IProduct) {
        //try {
        //    const updatedProduct = await productsSchema.updateOne(product);
        //    return updateProduct;
        //} catch(err) {
        //    throw new Error();
        //}
    }
}
