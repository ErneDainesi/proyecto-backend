import express, {Application} from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import productsController from './routes/products.route';
import cartController from './routes/cart.route';
import loginController from './routes/login.route';
import signupController from './routes/signup.route';
import passport from './passport';
import compression from 'compression';
import {COOKIE_MAX_AGE} from './constants';

const app: Application = express();
const ejs = require("ejs").__express; // solucion a error "cannot find ejs module"

app.use(session({
	store: MongoStore.create({mongoUrl: (process.env.ATLAS_URI as string)}),
	secret: 'secreto',
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: COOKIE_MAX_AGE
	}
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/products', productsController);
app.use('/cart', cartController);
app.use('/login', loginController);
app.use('/signup', signupController);
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.engine('ejs', ejs);

export default app;

