import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelled, OrderStatus } from '@a4hticket/common';
import { orderCancelledListener } from '../orderCancelledListener';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../model/ticket.model';
const setup = async () => {
  const listener = new orderCancelledListener(natsWrapper.client);
  const ticket = Ticket.build({
    price: 50,
    title: 'aLOHAAAAAAA',
    userId: 'asdsadasd'
  });
  ticket.set({ userId: new mongoose.Types.ObjectId().toHexString() });
  await ticket.save();
  const data: OrderCancelled['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: ticket.id
    }
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  return { listener, data, msg, ticket };
};
it('updates the ticket property after orderCancelled event', async () => {
  const { listener, data, msg, ticket } = await setup();
  await listener.onMessage(data, msg);
  const updateTicket = await Ticket.findById(ticket.id);
  expect(updateTicket!.orderId).not.toBeDefined();
});

it('acks a message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
it('publishes an update ticket event', async () => {
  const { listener, data, msg, ticket } = await setup();
  await listener.onMessage(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
