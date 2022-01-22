import express, {IRouter} from 'express';
import {makeUserAdmin} from '../controllers/user.controller';
import {checkIfSessionIsActive} from '../lib/validations';

const router: IRouter = express.Router();

router.get('/', checkIfSessionIsActive, makeUserAdmin);

export default router;

