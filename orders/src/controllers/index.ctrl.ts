import { NextFunction, Request, Response } from 'express';
import { notFoundError } from '@a4hticket/common';
import { Order } from '../models/order.model';

interface RequestWithUser extends Request {
  currentUser: {
    id: string;
    email: string;
  }; // or any other type
}

const getOrderCtrl = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const order = await Order.find({ userId: req.currentUser!.id }).populate(
    'ticket'
  );
  return res.status(200).send(order);
};

export { getOrderCtrl };
