import {Document, Schema, model} from "mongoose";

export interface User extends Document {
	name: string,
	lastname: string,
	address: string,
	age: number,
	telnumber: string,
	avatar: string,
	email: string,
	password: string
}

const UserSchema = new Schema<User>({
	name: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	telnumber: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

export default model<User>("UserMongo", UserSchema);

