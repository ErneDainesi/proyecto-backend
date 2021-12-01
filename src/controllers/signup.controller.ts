import {Request, Response} from "express";
import {User} from "../schemas/User.schema";

export const signup = (req: Request, res: Response) => {
	const user: User = {...req.body};
	req.session.user = user;
	res.send({message: 'signup success'});
}

export const loadSignupPage = (req: Request, res: Response) => {
	res.render('pages/signup');
};

export const signupSuccess = (req: Request, res: Response) => {
	res.redirect('/home');
};

export const signupError = (req: Request, res: Response) => {
	res.send('signup error');
};

