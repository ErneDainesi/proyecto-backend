import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import UserSchema, {User} from './schemas/User.schema';
import {MongoDatabase} from './database/mongodb/MongoDatabase';
import {isValidPassword, hashPassword} from './lib/passwordManager';

passport.use('login', new LocalStrategy({
	passReqToCallback: true
}, (req, username, password, done) => {
	UserSchema.findOne({username}, (err: any, user: User) => {
		if (err) return done(err);
		if (!user) {
			return done(null, false);
		}
		if (!isValidPassword(user, password)) {
			return done(null, false);
		}
		return done(null, user);
	})
}));

passport.use('signup', new LocalStrategy({
	passReqToCallback: true
}, (req, name, password, done) => {
	UserSchema.findOne({name}, (err: any, user: User) => {
		if (err) return done(err);
		if (user) {
			return done(null, false);
		}
		const hashedPassword = hashPassword(req.body.password);
		const newUser: User = {...req.body, password: hashedPassword};
		const mongoDB: MongoDatabase = new MongoDatabase();
		try {
			mongoDB.insertUser(newUser);
			return done(null, newUser);
		} catch (err) {
			console.error(err);
		}
	})
}));

passport.serializeUser((user, done) => {
	done(null, (user as User)._id);
});

passport.deserializeUser((name: string, done) => {
	UserSchema.find({name: name}, (err: any, user: User) => {
		done(err, user);
	});
});

export default passport;

