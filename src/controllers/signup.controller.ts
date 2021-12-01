import {Request, Response} from "express";
import logger from "../logger/winston";
import {User} from "../schemas/User.schema";

export const signup = (req: Request, res: Response) => {
	const user: User = {...req.body};
	req.session.user = user;
	logger.info('Created session for user', user);
	res.send({message: 'signup success'});
}

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

