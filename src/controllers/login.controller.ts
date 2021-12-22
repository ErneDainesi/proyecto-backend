import {Request, Response} from "express";

export const loadLoginPage = (req: Request, res: Response) => {
	res.render('pages/login');
};

export const loginSuccess = (req: Request, res: Response) => {
	res.redirect('/home');
};

export const loginError = (req: Request, res: Response) => {
	res.send('error logging in');
};

