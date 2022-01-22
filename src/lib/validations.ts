import {Request, Response, NextFunction} from 'express';
import logger from '../logger/winston';

export const checkIfIsAdmin = (req: Request, res: Response, next: NextFunction) => {
	const isAdmin: boolean = req.session.user?.isAdmin;
	if (isAdmin) {
        next();
        return;
	}
    res.status(400).json({
        error: -1,
        description: `Route ${req.originalUrl} method ${req.method} not authorized`
    });
};

export const checkIfSessionIsActive = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        next();
        return;
    }
    logger.error('User not logged in');
    res.redirect('/login');
}

