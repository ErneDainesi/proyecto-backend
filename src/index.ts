import {Request, Response} from 'express';
import {PORT} from './constants';
import {MongoDatabase} from './database/mongodb/MongoDatabase';
import {config} from "dotenv";
import app from './app';

config(); // config para variables de entorno
MongoDatabase.connect();

app.get('/', (req: Request, res: Response) => {
	res.send('<h1>Proyecto Backend</h1>');
});

app.listen(PORT, () => {
	console.log(`Express Server listening on port: ${PORT}`);
});

