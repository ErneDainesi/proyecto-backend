import {MongoDatabase} from '../db/MongoDatabase';
import logger from '../../logger/winston';
import ChatMessageSchema, {IChatMessage} from './chat.schema';
import {
	DB_FAILED_GET,
	DB_FAILED_INSERT,
} from '../../constants';

export class ChatDao {
	constructor() {
		MongoDatabase.Instance.connect();
	}

    public async saveMessage(message: IChatMessage) {
        const newMessage = new ChatMessageSchema(message);
        try {
            await newMessage.save();
            logger.info('Chat message saved');
        } catch (err) {
            logger.error(`[${DB_FAILED_INSERT}] | ${err}`);
        }
    }

    public async getMessages(filter: any = null) {
        try {
            const query: any = filter ? {email: filter} : {};
			const messages: Array<IChatMessage> = await ChatMessageSchema.find(query);
            return messages;
        } catch (err) {
           logger.error(err);
        }
    }

}
