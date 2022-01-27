import {Request, Response} from "express";
import { CartDao } from "../database/cart/cartDao";
import { OrderDao } from "../database/order/orderDao";
import { sendMailToUser } from "../lib/messaging";

const orderDao: OrderDao = new OrderDao();
const cartDao: CartDao = new CartDao();

export const getOrder = async (req: Request, res: Response) => {
    const order = await orderDao.getOrder(req.session.user.email);
    if (!order) {
        res.send({error: "no order was found"});
        return;
    }
    res.send(order);
};

export const createOrder = async (req: Request, res: Response) => {
    const email = req.session.user.email;
    const cart = await cartDao.getCart(email);
    if (cart.items.length < 1) {
        res.send({error: "cart is empty"});
        return;
    }
    const order = await orderDao.createNewOrder(cart);
    await cartDao.emptyCart(email);
    sendMailToUser(order);
    res.send(order);
};

