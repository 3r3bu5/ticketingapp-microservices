import { NextFunction, Request, Response } from 'express';
import {
  notAuthorizedError,
  notFoundError,
  OrderStatus
} from '@a4hticket/common';
import { Order } from '../models/order.model';
import { OrderCancelledPublisher } from '../events/publishers/orderCancelledPub';
import { natsWrapper } from '../nats-wrapper';

interface RequestWithUser extends Request {
  currentUser: {
    id: string;
    email: string;
  }; // or any other type
}

const deleteOne = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const order = await Order.findById(req.params.id).populate('ticket');
  if (!order) {
    throw new notFoundError();
  }
  if (order.userId !== req.currentUser.id) {
    throw new notAuthorizedError();
  }
  order.status = OrderStatus.Cancelled;
  order.save();
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    ticket: {
      id: order.ticket.id
    }
  });
  return res.status(204).send(order);
};

export { deleteOne };
