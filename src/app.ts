import express, {Application} from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import productsController from './routes/products.route';
import cartController from './routes/cart.route';
import loginController from './routes/login.route';
import signupController from './routes/signup.route';
import homeController from './routes/home.route';
import chatController from './routes/chat.route';
import userController from './routes/user.route';
import orderController from './routes/order.route';
import logoutController from './routes/logout.route';
import passport from './passport';
import compression from 'compression';
import {COOKIE_MAX_AGE} from './constants';
import {IUser} from './database/users/users.schema';
import {graphqlHTTP} from 'express-graphql';
import {schema, root} from './graphql/router/graphql';
import {createServer} from 'http';
import {Server} from 'socket.io';
import path from 'path';

export const app: Application = express();
export const server = createServer(app);
export const io = new Server(server);

const ejs = require("ejs").__express; // solucion a error "cannot find ejs module"

declare module 'express-session' {
	interface SessionData {
		user: IUser,
	}
}

app.use(session({
	store: MongoStore.create({mongoUrl: process.env.ATLAS_URI as string}),
	secret: 'secreto',
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: COOKIE_MAX_AGE
	}
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productsController);
app.use('/cart', cartController);
app.use('/login', loginController);
app.use('/signup', signupController);
app.use('/home', homeController);
app.use('/chat', chatController);
app.use('/user', userController);
app.use('/order', orderController);
app.use('/logout', logoutController);
app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
}));

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.engine('ejs', ejs);

