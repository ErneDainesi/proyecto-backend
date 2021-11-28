import {Request, Response} from "express";

export const login = (req: Request, res: Response) => {
	res.render('pages/login');
};

export const loginSuccess = (req: Request, res: Response) => {
	res.send('ok');
};

export const loginError = (req: Request, res: Response) => {
	res.send('error logging in');
};

