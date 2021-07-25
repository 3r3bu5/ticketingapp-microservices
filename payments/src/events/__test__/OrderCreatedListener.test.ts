import { natsWrapper } from '../../nats-wrapper';
import { OrderCreated, OrderStatus } from '@a4hticket/common';
import { OrderCreatedListener } from '../listeners/OrderCreatedListener';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Order } from '../../model/order.model';
const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const data: OrderCreated['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: 'asdsad',
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
      price: 50
    }
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  return { listener, data, msg };
};
it('replicats order creation', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const orderCreated = await Order.findById(data.id);
  expect(orderCreated!.price).toEqual(data.ticket.price);
});

it('acks a message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
