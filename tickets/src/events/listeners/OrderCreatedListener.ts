import { Listener, OrderCreated, Subjects } from '@a4hticket/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../model/ticket.model';
import { TicketUpdatedPublisher } from '../publishers/ticketUpdatedPub';
import { queueGroupName } from './queuGroupName';
export class OrderCreatedListener extends Listener<OrderCreated> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreated['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    ticket.set({
      orderId: data.id
    });
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      version: ticket.version,
      userId: ticket.userId,
      orderId: ticket.orderId
    });
    msg.ack();
  }
}
