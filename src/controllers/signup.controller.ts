import {Request, Response} from "express";
import logger from "../logger/winston";
import {MongoDatabase} from "../database/mongodb/MongoDatabase";

const db = MongoDatabase.Instance;

export const loadSignupPage = (req: Request, res: Response) => {
	res.render('pages/signup');
};

export const signupSuccess = (req: Request, res: Response) => {
	logger.info('signup succes');
	res.redirect('/home');
};

export const signupError = (req: Request, res: Response) => {
	logger.error('Error occured when signing up');
	res.send('signup error');
};

