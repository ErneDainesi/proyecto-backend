import {MongoDatabase} from '../db/MongoDatabase';
import logger from '../../logger/winston';
import {
    DB_FAILED_DELETE,
	DB_FAILED_GET,
	DB_FAILED_INSERT,
} from '../../constants';
import { IProduct } from '../products/products.schema';
import cartSchema, { ICart } from './cart.schema';

export class CartDao {
	constructor() {
		MongoDatabase.Instance.connect();
	}

    public async getCart(email: string) {
        try {
            const cart = await cartSchema.findOne({email: email});
            return cart;
        } catch (err) {
           logger.error(`[${DB_FAILED_GET}] | ${err}`);
        }
    }

    public async addToCart(product: IProduct, email: string) {
        try {
           const cart = await cartSchema.findOne({email}, {}); 
           cart.items.push(product);
           await cart.save();
        } catch (err) {
			logger.error(`[${DB_FAILED_INSERT}] | ${err}`);
        }
    }

    public async removeFromCart(productId: string, email: string) {
        try {
            const cart = await this.getCart(email);
            cart.items = this.removeItemFromCart(cart.items, productId);
            cart.save();
            return cart;
        } catch (err) {
           logger.error(`[${DB_FAILED_DELETE}] | ${err}`);
        }
    }

    public async insertCart(cart: ICart) {
		const newCart = new cartSchema(cart);
		try {
			await newCart.save();
			logger.info('New cart created');
		} catch (err) {
			logger.error(`[${DB_FAILED_INSERT}] | ${err}`);
		}
    }

    public async getProduct(productId: string, email: string) {
        try {
           const cart = await this.getCart(email);
           return this.getProductFromCart(cart.items, productId);
        } catch (err) {
           logger.error(`[${DB_FAILED_GET}] | ${err}`);
        }
    }

    private getProductFromCart(cartItems: Array<IProduct>, productId: string) {
        const product = cartItems.forEach(item => {
            if (item._id === productId) {
                return item;
            }
        })
        return product;
    }

    private removeItemFromCart(cartItems: Array<IProduct>, productId: string) {
        const updatedCart = cartItems.filter(item => {
            if (item._id === productId) {
               return item;
            }
        });
        return updatedCart;
    }
}

