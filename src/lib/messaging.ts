import { IOrder } from '../database/order/order.schema';
import { IUser } from '../database/users/users.schema';
import logger from '../logger/winston';
import {transporter} from '../mailer';

export const sendMailToAdmin = (user: IUser) => {
  const mailOptions = {
		from: 'Nodejs server',
		to: 'weston.braun16@ethereal.email',
		subject: 'New User Created',
		html: `<h1>New user created with email ${user.email}</h1>`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      logger.error(err);
      throw new Error('Error while sending email to admin');
    }
    logger.info(info);
  });
};

export const sendMailToUser = (order: IOrder) => {
    const orderDetail = JSON.stringify(order.items);
    const mailOptions = {
        from: 'Nodejs server',
        to: 'weston.braun16@ethereal.email',
        subject: 'Compra exitosa',
        html: `<h1>Gracias por su compra!</h1><br><div>${orderDetail}</div>`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        logger.error(err);
        throw new Error('Error while sending email to user');
      }
      logger.info(info);
    });
}
