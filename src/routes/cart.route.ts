import express, {IRouter} from 'express';
import {
	getCart,
	getProductFromCart,
	addProductToCart,
    removeProductFromCart
} from '../controllers/cart.controller';
import { checkIfSessionIsActive } from '../lib/validations';

const router: IRouter = express.Router();

router.get('/', checkIfSessionIsActive, getCart);
router.get('/:idProduct', checkIfSessionIsActive, getProductFromCart);
router.post('/:idProduct', checkIfSessionIsActive, addProductToCart);
router.delete('/:idProduct', checkIfSessionIsActive, removeProductFromCart);

export default router;

