import { Listener, OrderCancelled, Subjects } from '@a4hticket/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../model/ticket.model';
import { TicketUpdatedPublisher } from '../publishers/ticketUpdatedPub';
import { queueGroupName } from './queuGroupName';
export class orderCancelledListener extends Listener<OrderCancelled> {
  subject: Subjects.orderCancelled = Subjects.orderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelled['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    ticket.set({
      orderId: undefined
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
