import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import UserSchema, {IUser} from './database/users/users.schema';
import {isValidPassword, hashPassword, passwordEqualsPasswordValidation} from './lib/passwordManager';
import {UsersDao} from './database/users/usersDao';
import logger from "./logger/winston";
import {sendMailToAdmin} from './lib/messaging';

passport.use('login', new LocalStrategy({
	passReqToCallback: true,
	usernameField: 'email'
}, (req, email, password, done) => {
	UserSchema.findOne({email}, (err: any, user: IUser) => {
		if (err) return done(err);
		if (!user) {
			return done(null, false);
		}
		if (!isValidPassword(user, password)) {
			return done(null, false);
		}
		req.session.user = user;
		return done(null, user);
	})
}));

passport.use('signup', new LocalStrategy({
	passReqToCallback: true,
	usernameField: 'email'
}, (req, email, password, done) => {
	UserSchema.findOne({email}, (err: any, user: IUser) => {
		if (err) {
			logger.error(err);
			return done(err);
		}
		if (user) {
			return done(null, false);
		}
    const isPasswordValid = passwordEqualsPasswordValidation(req.body.password, req.body.passwordVerification);
    if (!isPasswordValid) {
      return done(err);
    }
		const hashedPassword = hashPassword(req.body.password);
		const newUser: IUser = {
			...req.body,
			password: hashedPassword,
			isAdmin: false
		};
		const userDao: UsersDao = new UsersDao();
		try {
			userDao.insertUser(newUser);
			req.session.user = newUser;
      sendMailToAdmin(newUser);
			return done(null, newUser);
		} catch (err) {
			logger.error(err);
		}
	})
}));

passport.serializeUser((user, done) => {
	done(null, (user as IUser).email);
});

passport.deserializeUser((email: string, done) => {
	UserSchema.find({email: email}, (err: any, user: IUser) => {
		done(err, user);
	});
});

export default passport;

