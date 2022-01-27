import {MongoDatabase} from '../db/MongoDatabase';
import logger from '../../logger/winston';
import {
    DB_FAILED_DELETE,
	DB_FAILED_GET,
	DB_FAILED_INSERT,
} from '../../constants';
import { ICart } from '../cart/cart.schema';
import { IProduct } from '../products/products.schema';
import orderSchema, { IProductOrder } from './order.schema';

export class OrderDao {
	constructor() {
		MongoDatabase.Instance.connect();
	}

    public async getOrder(email: string) {
        try {
            const order = await orderSchema.findOne({email});
            return order;
        } catch (err) {
           logger.error(`[${DB_FAILED_GET}] | ${err}`);
        }
    }

    public async createNewOrder(cart: ICart) {
        const {email, items} = cart;
        const productsOrder = this.createItemsArray(items);
        const order = new orderSchema(
            {
                email,
                items: productsOrder,
                date: new Date()
            }
        );
        try {
            const newOrder = await order.save();
            return newOrder;
        } catch (err) {
           logger.error(`[${DB_FAILED_INSERT}] | ${err}`);
        }
    }

    private createItemsArray(items: Array<IProduct>) {
        const itemsMap: any = {};
        for (let item of items) {
            let itemName: string = item.name;
            if (itemsMap[itemName]) {
                itemsMap[itemName].amount += 1;
                continue;
            }
            itemsMap[itemName] = {
                amount: 1,
                item
            };
        }
        return itemsMap;
    }
}

