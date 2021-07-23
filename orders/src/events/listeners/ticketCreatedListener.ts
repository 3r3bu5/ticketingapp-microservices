import { Subjects, TicketCreatedEvent, Listener } from '@a4hticket/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket.model';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.ticketCreated = Subjects.ticketCreated;
  queueGroupName = queueGroupName.orderService;
  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price
    });
    await ticket.save();
    return msg.ack();
  }
}
