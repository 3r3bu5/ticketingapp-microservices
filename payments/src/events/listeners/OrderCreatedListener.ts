import { Listener, OrderCreated, Subjects } from '@a4hticket/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../model/order.model';
import { queuGroupName } from './queuGroupName';

export class OrderCreatedListener extends Listener<OrderCreated> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
  queueGroupName = queuGroupName;
  async onMessage(data: OrderCreated['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version
    });
    await order.save();
    msg.ack();
  }
}
