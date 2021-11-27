import {Request, Response} from "express";
import {MongoDatabase} from '../database/mongodb/MongoDatabase';

export const loginPage = (req: Request, res: Response) => {
	res.send('ok');
};

export const login = (req: Request, res: Response) => {
	res.send('ok');
};

export const loginError = (req: Request, res: Response) => {
	res.send('ok');
};

