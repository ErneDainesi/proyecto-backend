import {Request, Response} from 'express';
import {PORT} from './constants';
import {config} from "dotenv";
import app from './app';
import logger from './logger/winston';

config();

app.get('/', (req: Request, res: Response) => {
	res.render('pages/index');
});

app.listen(PORT, () => {
	logger.info(`Express Server listening on port: ${PORT}`);
});

