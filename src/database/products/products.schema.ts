import {Document, model, Schema} from "mongoose";

export interface IProduct extends Document {
	name: string,
	description: string,
  category: string,
	stock: number,
	price: number
}

const productSchema = new Schema<IProduct>({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
  category: {
    type: String,
    required: true
  },
	stock: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
});

export default model<IProduct>("Product", productSchema);

