import {
  Subjects,
  TicketUpdatedEvent,
  Listener,
  APIError
} from '@a4hticket/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket.model';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.ticketUpdated = Subjects.ticketUpdated;
  queueGroupName = queueGroupName.orderService;
  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new APIError('Ticket not found');
    }
    ticket.set({
      title,
      price
    });
    await ticket.save();
    return msg.ack();
  }
}
