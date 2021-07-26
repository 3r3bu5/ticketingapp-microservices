import { NextFunction, Request, Response } from 'express';
import {
  APIError,
  notAuthorizedError,
  notFoundError,
  OrderStatus
} from '@a4hticket/common';
import { Order } from '../model/order.model';
import { stripe } from '../stripe';
import { Payment } from '../model/payment.model';
import { paymentCreatedPub } from '../events/publishers/paymentCreatedPub';
import { natsWrapper } from '../nats-wrapper';

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
  if (order.status === OrderStatus.Completed) {
    throw new APIError('Order has been already paid!');
  }
  
  const charge = await stripe.charges.create({
    currency: 'usd',
    amount: order.price * 100,
    source: token
  });
  const payment = Payment.build({
    orderId,
    stripeId: charge.id
  });
  await payment.save();
  new paymentCreatedPub(natsWrapper.client).publish({
    id: payment.id,
    orderId: payment.orderId,
    stripeId: payment.stripeId
  });
  order.set({
    status: OrderStatus.Completed
  })
  await order.save()
  res.status(201).send({ id: payment.id });
};

export { chargeCtrl };
