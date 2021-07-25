import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderStatus, expirationCompleteEvent } from '@a4hticket/common';
import { expirationCompleteListener } from '../expirationCompleteListener';
import { natsWrapper } from '../../../nats-wrapper';
import { Order } from '../../../models/order.model';
import { Ticket } from '../../../models/ticket.model';

const setup = async () => {
  const listener = new expirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();
  const order = Order.build({
    status: OrderStatus.Created,
    userId: 'alskdfj',
    expiresAt: new Date(),
    ticket
  });
  await order.save();
  console.log('setup orderId', order.id);
  const data: expirationCompleteEvent['data'] = {
    orderId: order.id
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, order, ticket, data, msg };
};

it('updates the order status to cancelled', async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);
  console.log(updatedOrder);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('ack the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
