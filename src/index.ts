import express from 'express';

const app = express();
const ejs = require("ejs").__express; // solucion a error "cannot find ejs module"
const products = require('./routes/products.route');
const cart = require('./routes/cart.route');
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/products', products);
app.use('/cart', cart);

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.engine('ejs', ejs);

app.get('/', (req, res) => {
	res.send('<h1>Proyecto Backend</h1>');
});

app.listen(PORT, () => {
	console.log(`Servidor express Typescript/Webpack en puerto ${PORT}`);
});
