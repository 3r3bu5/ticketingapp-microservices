import { NextFunction, Request, Response } from 'express';
import {
  APIError,
  notAuthorizedError,
  notFoundError,
  OrderStatus
} from '@a4hticket/common';
import { Order } from '../model/order.model';

const chargeCtrl = async (req: Request, res: Response, next: NextFunction) => {
  const { token, orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new notFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new notAuthorizedError();
  }
  if (order.status === OrderStatus.Cancelled) {
    throw new APIError('Order has been cancelled earlier!');
  }

  res.send({ sunccess: 'true' });
};

export { chargeCtrl };
