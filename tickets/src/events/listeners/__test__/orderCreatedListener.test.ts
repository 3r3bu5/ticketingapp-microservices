import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreated, OrderStatus } from '@a4hticket/common';
import { OrderCreatedListener } from '../OrderCreatedListener';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../model/ticket.model';
const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const ticket = Ticket.build({
    price: 50,
    title: 'aLOHAAAAAAA',
    userId: 'asdsadasd'
  });
  await ticket.save();
  const data: OrderCreated['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: 'asdsad',
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  return { listener, data, msg, ticket };
};
it('sets the orderId to the ticket property after orderCreated event', async () => {
  const { listener, data, msg, ticket } = await setup();
  await listener.onMessage(data, msg);
  const updateTicket = await Ticket.findById(ticket.id);
  expect(updateTicket!.orderId).toEqual(data.id);
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
