import express, {IRouter} from 'express';
import {
	getCart,
	getProductFromCart,
	addProductToCart,
    removeProductFromCart
} from '../controllers/cart.controller';

const router: IRouter = express.Router();

router.get('/', getCart);
router.get('/:idProduct', getProductFromCart);
router.post('/:idProduct', addProductToCart);
router.delete('/:idProduct', removeProductFromCart);

export default router;

