import express, {Application, Request, Response} from 'express';
import productsController from './routes/products.route';
import cartController from './routes/cart.route';
import {PORT} from './constants';
import {MongoDatabase} from './database/mongodb/MongoDatabase';
import {config} from "dotenv";

config(); // config para variables de entorno

const app: Application = express();
const ejs = require("ejs").__express; // solucion a error "cannot find ejs module"

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/products', productsController);
app.use('/cart', cartController);

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.engine('ejs', ejs);

app.get('/', (req: Request, res: Response) => {
	res.send('<h1>Proyecto Backend</h1>');
});

MongoDatabase.connect();

app.listen(PORT, () => {
	console.log(`Servidor express Typescript/Webpack en puerto ${PORT}`);
});
