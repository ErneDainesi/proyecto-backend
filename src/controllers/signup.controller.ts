import {Request, Response} from "express";
import logger from "../logger/winston";

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

