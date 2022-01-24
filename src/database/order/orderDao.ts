import {MongoDatabase} from '../db/MongoDatabase';
import logger from '../../logger/winston';
import {
    DB_FAILED_DELETE,
	DB_FAILED_GET,
	DB_FAILED_INSERT,
} from '../../constants';

export class OrderDao {
	constructor() {
		MongoDatabase.Instance.connect();
	}
}

