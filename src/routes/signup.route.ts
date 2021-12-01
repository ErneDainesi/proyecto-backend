import express, {IRouter} from 'express';
import passport from '../passport';
import {signup, signupSuccess, signupError, loadSignupPage} from '../controllers/signup.controller';

const router: IRouter = express.Router();

router.post('/', passport.authenticate(
	'signup',
	{
		failureRedirect: '/signup/error',
		successRedirect: '/signup/success'
	}
), signup);
router.get('/', loadSignupPage);
router.get('/success', signupSuccess);
router.get('/error', signupError);

export default router;

