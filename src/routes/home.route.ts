import express, {IRouter} from 'express';
import {home} from '../controllers/home.controller';

const router: IRouter = express.Router();

router.get('/', home);

export default router;

