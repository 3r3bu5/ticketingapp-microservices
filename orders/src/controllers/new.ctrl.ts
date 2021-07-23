import { APIError, notFoundError, OrderStatus } from '@a4hticket/common';
import { NextFunction, Request, Response } from 'express';
import { OrderCreatedPublisher } from '../events/publishers/orderCreatedPub';
import { Order } from '../models/order.model';
import { Ticket } from '../models/ticket.model';
import { natsWrapper } from '../nats-wrapper';

const expirationTime = 15 * 60;

const newOrder = async (req: Request, res: Response, next: NextFunction) => {
  // find the ticket user trying to order
  const { ticketId } = req.body;
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new notFoundError();
  }
  // make sure that the ticket isn't reserved
  const existingOrder = await Order.findOne({
    ticket: ticket.id,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Completed
      ]
    }
  });
  if (existingOrder) {
    throw new APIError('Sorry! you cant reserve this ticket at this time ');
  }
  // calculate the expiration date
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + expirationTime);

  const order = Order.build({
    userId: req.currentUser!.id,
    expiresAt: expiration,
    status: OrderStatus.Created,
    ticket: ticket
  });
  await order.save();
  new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    expiresAt: order.expiresAt.toISOString(),
    status: order.status,
    userId: order.userId,
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  })
  
  return res.status(201).send(order);
};

export { newOrder };
