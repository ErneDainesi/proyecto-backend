import {Request, Response} from "express";

export const home = (req: Request, res: Response) => {
	const name = req.session.user?.name;
	res.render('pages/home', {name});
}
