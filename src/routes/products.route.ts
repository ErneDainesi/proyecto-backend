import express, {Response, Request} from 'express';
import {checkIfIsAdmin, checkIfSessionIsActive} from '../lib/validations';
import {
	deleteProduct,
	getProduct,
	getProductsPage,
	getProductsView,
	saveProduct,
	updateProduct,
    getProductsFromCategory
} from '../controllers/products.controller';

const router = express.Router();

router.get('/', checkIfSessionIsActive, getProductsPage);
router.get('/view', checkIfSessionIsActive, getProductsView);
router.get('/:id', getProduct);
router.get('/category/:category', checkIfSessionIsActive, getProductsFromCategory);
router.post('/', [checkIfSessionIsActive, checkIfIsAdmin], saveProduct);
router.put('/:productId', [checkIfSessionIsActive, checkIfIsAdmin], updateProduct);
router.delete('/:productId', [checkIfSessionIsActive, checkIfIsAdmin], deleteProduct);

export default router;
