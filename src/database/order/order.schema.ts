import {Document, Schema, model} from "mongoose";
import {IProduct} from '../products/products.schema';

export interface IProductOrder {
    amount: number,
    item: IProduct
}

export interface IOrder extends Document {
  email: string,
  items: Array<IProductOrder>,
  date: string,
};

const OrderSchema = new Schema<IOrder>({
  email: {
    type: String,
    required: true
  },
  items: {
    type: [],
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

export default model<IOrder>("order", OrderSchema);

