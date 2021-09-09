import express from 'express';
import {Cart} from '../lib/Cart';

const router = express.Router();
const carts: Cart[] = [];

router.get('/', (req, res) => {
	const cart: Cart = new Cart(carts.length + 1, Date.now());
	carts.push(cart);
	res.send('<h1>Cart</h1>');
});

router.get('/:idCart/:idProduct', (req, res) => {
	const idProduct = req.params.idProduct ? +req.params.idProduct : false;
	const idCart: number = +req.params.idCart;
	const selectedCart: Cart = carts[idCart - 1];
	if (idProduct) {
		res.send(selectedCart.getProduct(idProduct));
	} else {
		res.send(selectedCart.cartProducts());
	}
});

router.post('/:idCart/:idProduct', (req, res) => {
	const product: Object = {
		...req.body,
		id: +req.params.idProduct,
		timeStamp: Date.now()
	};
	const cart: Cart = carts[+req.params.idCart - 1];
	cart.addToCart(product);
	res.json(product);
});

router.delete('/:idCart/:idProduct', (req, res) => {
	const productId: number = +req.params.idProduct;
	const cart: Cart = carts[+req.params.idCart - 1];
	const deletedProduct: Object = cart.removeFromCart(productId);
	res.send(deletedProduct);
});

module.exports = router;
