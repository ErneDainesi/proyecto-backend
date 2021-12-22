import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import UserSchema, {User} from './schemas/User.schema';
import {isValidPassword, hashPassword} from './lib/passwordManager';
import {MongoDatabase} from './database/mongodb/MongoDatabase';
import logger from "./logger/winston";

passport.use('login', new LocalStrategy({
	passReqToCallback: true,
	usernameField: 'email'
}, (req, email, password, done) => {
	UserSchema.findOne({email}, (err: any, user: User) => {
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
	UserSchema.findOne({email}, (err: any, user: User) => {
		if (err) {
			logger.error(err);
			return done(err);
		}
		if (user) {
			return done(null, false);
		}
		const hashedPassword = hashPassword(req.body.password);
		const newUser: User = {...req.body, password: hashedPassword};
		const db: MongoDatabase = MongoDatabase.Instance;
		try {
			db.insertUser(newUser);
			req.session.user = newUser;
			return done(null, newUser);
		} catch (err) {
			logger.error(err);
		}
	})
}));

passport.serializeUser((user, done) => {
	done(null, (user as User).email);
});

passport.deserializeUser((email: string, done) => {
	UserSchema.find({email: email}, (err: any, user: User) => {
		done(err, user);
	});
});

export default passport;

