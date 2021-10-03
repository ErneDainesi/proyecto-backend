import {Document, model, Schema} from "mongoose";

export interface IProduct extends Document {
    name: string,
    description: string,
    stock: number,
    price: number
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    description: String,
    stock: Number,
    price: Number
});

export default model<IProduct>("ProductMongo", productSchema);