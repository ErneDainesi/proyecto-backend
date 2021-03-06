import express, {IRouter} from 'express';
import {loginSuccess, loginError, loadLoginPage} from '../controllers/login.controller';
import passport from '../passport';

const router: IRouter = express.Router();

router.post('/', passport.authenticate(
	'login',
	{
		failureRedirect: '/login/error',
		successRedirect: '/login/success'
	}
));
router.get('/', loadLoginPage);
router.get('/success', loginSuccess);
router.get('/error', loginError);

export default router;

