import {Document, Schema, model} from "mongoose";

export interface IUser extends Document {
	name: string,
	lastname: string,
	address: string,
	age: number,
	telnumber: string,
	avatar: string,
	email: string,
	password: string,
	isAdmin: boolean
}

const UserSchema = new Schema<IUser>({
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
	},
	isAdmin: {
		type: Boolean
	}
});

export default model<IUser>("User", UserSchema);

