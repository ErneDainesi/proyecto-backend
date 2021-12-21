import {Request, Response} from "express";
import {User} from "../schemas/User.schema";

export const login = (req: Request, res: Response) => {
	const user: User = {...req.body};
	req.session.user = user;
	res.send({message: 'login success'});
}

export const loadLoginPage = (req: Request, res: Response) => {
	res.render('pages/login');
};

export const loginSuccess = (req: Request, res: Response) => {
	res.redirect('/home');
};

export const loginError = (req: Request, res: Response) => {
	res.send('error logging in');
};

