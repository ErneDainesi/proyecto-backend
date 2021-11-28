import bcrypt from 'bcrypt';
import {User} from '../schemas/User.schema';

export const isValidPassword = (user: User, password: string) => {
	return bcrypt.compareSync(password, user.password);
};

export const hashPassword = (password: string) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

