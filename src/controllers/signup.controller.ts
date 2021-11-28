import {Request, Response} from "express";

export const signup = (req: Request, res: Response) => {
	res.send('signup form');
};

export const signupSuccess = (req: Request, res: Response) => {
	res.send('ok');
};

export const signupError = (req: Request, res: Response) => {
	res.send('signup error');
};

