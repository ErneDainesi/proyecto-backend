import UserSchema, {IUser} from './users.schema';
import {UsersDto} from './usersDto';
import logger from '../../logger/winston';
import {
	DB_FAILED_GET,
	DB_FAILED_INSERT,
} from '../../constants';
import {MongoDatabase} from '../db/MongoDatabase';

export class UsersDao {
	constructor() {
		MongoDatabase.Instance.connect();
	}

	public async insertUser(user: IUser) {
		const newUser = new UserSchema(user);
		try {
			await newUser.save();
			logger.info('New user created');
		} catch (err) {
			logger.error(`[${DB_FAILED_INSERT}] | ${err}`);
		}
	}

	public async getUser(email: string) {
		try {
			const user: IUser | null = await UserSchema.findOne({email: email})
			return user;
		} catch (err) {
			logger.error(`[${DB_FAILED_GET}] | ${err}`);
		}
	}

	public async makeUserAdmin(user: IUser) {
		return UsersDto.makeAdminUser(user);
	}
}

