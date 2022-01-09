import express, {IRouter} from 'express';
import {messages, messagesFromUser} from '../controllers/chat.controller';
import { checkIfSessionIsActive } from '../lib/validations';

const router: IRouter = express.Router();

router.get('/', checkIfSessionIsActive, messages);
router.get('/:email', checkIfSessionIsActive, messagesFromUser);

export default router;

