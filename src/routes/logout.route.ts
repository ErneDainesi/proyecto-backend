import express, { IRouter } from 'express';
import { logout } from '../controllers/logout.controller';

const router: IRouter = express.Router();

router.get('/', logout);

export default router;
