import express, {IRouter} from 'express';
import { createOrder, getOrder } from '../controllers/order.controller';
import { checkIfSessionIsActive } from '../lib/validations';

const router: IRouter = express.Router();

router.get('/', checkIfSessionIsActive, getOrder);
router.post('/', checkIfSessionIsActive, createOrder);

export default router;

