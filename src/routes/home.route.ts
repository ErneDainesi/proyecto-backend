import express, {IRouter} from 'express';
import {home} from '../controllers/home.controller';
import { checkIfSessionIsActive } from '../lib/validations';

const router: IRouter = express.Router();

router.get('/', checkIfSessionIsActive, home);

export default router;

