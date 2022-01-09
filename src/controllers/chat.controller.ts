import {Request, Response} from "express";
import {ChatDao} from '../database/chat/chatDao';
import {io} from '../app';
import logger from "../logger/winston";

const chatDao: ChatDao = new ChatDao();

export const messages = async (req: Request, res: Response) => {
    io.on('connection', () => {
        logger.info('connection to socket io correct');
    });
    const messages = await chatDao.getMessages();
    res.render('pages/chat', {messages});
};

export const messagesFromUser = async (req: Request, res: Response) => {
    const {email} = req.params;
    const messages = await chatDao.getMessages(email);
    res.render('pages/chat', {messages});
};

