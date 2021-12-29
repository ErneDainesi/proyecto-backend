import {IUser} from "./users.schema";

export class UsersDto {

	public static makeAdminUser(user: IUser) {
		return {...user, isAdmin: true};
	}
}
