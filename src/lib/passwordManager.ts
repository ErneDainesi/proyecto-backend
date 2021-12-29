import bcrypt from 'bcrypt';
import {IUser} from '../database/users/users.schema';

export const isValidPassword = (user: IUser, password: string) => {
	return bcrypt.compareSync(password, user.password);
};

export const hashPassword = (password: string) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

