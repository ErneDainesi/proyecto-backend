import {Document, Schema, model} from "mongoose";
import {IProduct, productSchema} from '../products/products.schema';

export interface ICart extends Document {
  email: string,
  items: Array<IProduct>,
  date: string,
  shippingAddress: string
}

const CartSchema = new Schema<ICart>({
  email: {
    type: String,
    required: true
  },
  items: {
    type: [productSchema],
    required: true
  },
  date: {
    type: String,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  }
});

export default model<ICart>("cart", CartSchema);

