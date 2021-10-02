import express from 'express';
import {
	creatNewCart,
	getProduct,
	saveProduct,
	deleteProduct
} from '../controllers/cart.controller';

const router = express.Router();

router.get('/', creatNewCart);
router.get('/:idCart/:idProduct', getProduct);
router.post('/:idCart/:idProduct', saveProduct);
router.delete('/:idCart/:idProduct', deleteProduct);

export default router;
