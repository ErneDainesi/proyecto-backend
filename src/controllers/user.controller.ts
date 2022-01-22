import {Request, Response} from "express";
import { UsersDao } from "../database/users/usersDao";
import logger from "../logger/winston";

export const makeUserAdmin = async (req: Request, res: Response) => {
    const userDao: UsersDao = new UsersDao();
    try {
        const updatedUser = await userDao.makeUserAdmin(req.session.user);
        res.json({isAdmin: updatedUser.isAdmin});
    } catch (err) {
       logger.error(err);
    }
}
