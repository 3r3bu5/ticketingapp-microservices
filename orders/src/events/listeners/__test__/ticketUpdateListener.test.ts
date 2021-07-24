import { natsWrapper } from '../../../nats-wrapper';
import { TicketUpdatedEvent } from '@a4hticket/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket.model';
import { TicketUpdatedListener } from '../ticketUpdatedListener';
const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'alohaaa',
    price: 50
  });
  await ticket.save();
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    price: 999,
    title: 'concerts',
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: ticket.version + 1
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  return { listener, ticket, data, msg };
};
it('finds, update and save a ticket', async () => {
  const { listener, data, msg, ticket } = await setup();
  await listener.onMessage(data, msg);
  const updateTicket = await Ticket.findById(data.id);
  expect(updateTicket).toBeDefined();
  expect(updateTicket!.title).toEqual(data.title);
  expect(updateTicket!.price).toEqual(data.price);
  expect(updateTicket!.version).toEqual(data.version);
});

it('acks a message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

it('dosnt ack the message if the version is not correct', async () => {
  const { listener, data, msg, ticket } = await setup();
  data.version = 15;
  try {
    await listener.onMessage(data, msg);
  } catch (err) {}
  expect(msg.ack).not.toHaveBeenCalled();
});
