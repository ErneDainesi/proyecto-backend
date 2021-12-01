import {Request, Response} from 'express';
import {PORT} from './constants';
import {MongoDatabase} from './database/mongodb/MongoDatabase';
import {config} from "dotenv";
import app from './app';
import logger from './logger/winston';

config(); // config para variables de entorno
MongoDatabase.connect();

app.get('/', (req: Request, res: Response) => {
	res.render('pages/index');
});

app.listen(PORT, () => {
	logger.info(`Express Server listening on port: ${PORT}`);
});

