import express from 'express';
import {checkIfIsAdmin} from '../lib/validations';
import {overwriteFile} from '../lib/utilities';

const router = express.Router();
// const {checkIfIsAdmin} = require('../lib/validations');
const FILE_NAME = "./products.json";
const products: Object[] = [];

router.get('/', (req, res) => {
	res.render('pages/productos');
});

router.get('/view', (req, res) => {
	res.render("pages/vista", {
		products,
		thereAreProducts: products.length > 0
	});
});

router.get('/:id', (req, res) => {
	const idProducto: number = +req.params.id;
	if (!products[idProducto - 1]) {
		res.json({error: 'producto no encontrado'})
	} else {
		res.json(products[idProducto - 1]);
	}
});

router.post('/:userId', checkIfIsAdmin, (req, res) => {
	console.log("POST");
	const product: Object = {
		...req.body,
		timeStamp: Date.now(),
		code: products.length + 1,
		id: products.length + 1
	};
	products.push(product);
	overwriteFile(FILE_NAME, products);
	res.redirect('/products');
});

router.put('/:userId/:productId', checkIfIsAdmin, (req, res) => {
	const id: number = +req.params.productId;
	products[id - 1] = req.body;
	overwriteFile(FILE_NAME, products);
	res.send(products[id - 1]);
});

router.delete('/:userId/:productId', checkIfIsAdmin, (req, res) => {
	const productId: number = +req.params.productId;
	const deletedProduct = products.splice(productId - 1, 1);
	overwriteFile(FILE_NAME, products);
	res.send(deletedProduct[0]);
});

module.exports = router;
