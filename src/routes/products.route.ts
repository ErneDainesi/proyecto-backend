import express, {Response, Request} from 'express';
import {checkIfIsAdmin} from '../lib/validations';
import {
	deleteProduct,
	getProduct,
	getProductsPage,
	getProductsView,
	saveProduct,
	updateProduct
} from '../controllers/products.controller';

const router = express.Router();

router.get('/', getProductsPage);
router.get('/view', getProductsView);
router.get('/:id', getProduct);
router.post('/', checkIfIsAdmin, saveProduct);
router.put('/:productId', checkIfIsAdmin, updateProduct);
router.delete('/:productId', checkIfIsAdmin, deleteProduct);

export default router;
