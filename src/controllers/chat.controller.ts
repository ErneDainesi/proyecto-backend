import {Request, Response} from "express";
import {ChatDao} from '../database/chat/chatDao';
import {io} from '../app';
import logger from "../logger/winston";
import { Socket } from "socket.io";
import path from "path";

const chatDao: ChatDao = new ChatDao();
const chatView: string = path.join(__dirname, '../public', 'chat.html');

export const messages = async (req: Request, res: Response) => {
    const messages = await chatDao.getMessages();
    res.sendFile(chatView);
    io.on('connection', async (socket: Socket) => {
        logger.info('new connection on socket');
        io.sockets.emit("show-new-message", messages);
        socket.on("new-message", async (newMessage) => {
            const messages = await chatDao.saveMessage(newMessage);
            io.sockets.emit("show-new-message", messages);
        });
    });
};

export const messagesFromUser = async (req: Request, res: Response) => {
    const {email} = req.params;
    if (email !== req.session.user.email) {
        res.status(400).send({
            error: "email does not correspond to current user"
        });
        return;
    }
    const messages = await chatDao.getMessages(email);
    res.sendFile(chatView);
    io.on('connection', async (socket: Socket) => {
        logger.info('new connection on other socket');
        io.sockets.emit("show-new-message", messages);
        socket.on("new-message", async (newMessage) => {
            const messages = await chatDao.saveMessage(newMessage);
            io.sockets.emit("show-new-message", messages);
        });
    });
};

