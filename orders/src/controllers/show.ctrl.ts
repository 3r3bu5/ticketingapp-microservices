import { NextFunction, Request, Response } from 'express';
import { notAuthorizedError, notFoundError } from '@a4hticket/common';
import { Order } from '../models/order.model';

interface RequestWithUser extends Request {
  currentUser: {
    id: string;
    email: string;
  }; // or any other type
}

const getOneCtrl = async (
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
  return res.status(200).send(order);
};

export { getOneCtrl };
