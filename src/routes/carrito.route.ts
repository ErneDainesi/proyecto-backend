import express from 'express';

const router = express.Router();
const carrito: Object[] = [];

router.get('/:id', (req, res) => {
	const id = req.params.id ? +req.params.id : false;
	if (id) {
		res.send(carrito[id - 1]);
	} else {
		res.send(carrito);
	}
});

router.post('/:id', (req, res) => {
	const producto: Object = {
		...req.body,
		id: +req.params.id - 1
	};
	carrito.push(producto);
	res.send(producto);
});

router.delete('/:id', (req, res) => {
	const productId: number = +req.params.id;
	const deletedProduct: Object = carrito.splice(productId - 1, 1);
	res.send(deletedProduct[0]);
});
