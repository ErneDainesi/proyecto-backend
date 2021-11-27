import express, {IRouter} from 'express';
import {loginPage, login, loginError} from '../controllers/login.controller';

const router: IRouter = express.Router();

router.post('/', login);
router.get('/', loginPage);
router.get('/error', loginError);

export default router;
