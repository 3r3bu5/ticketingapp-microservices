import { Listener, OrderCreated, Subjects } from '@a4hticket/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';
import { queueGroupName } from './queueGroupName';
export class orderCreatedListener extends Listener<OrderCreated> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreated['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    await expirationQueue.add(
      {
        orderId: data.id
      },
      {
        delay
      }
    );
    msg.ack();
  }
}
