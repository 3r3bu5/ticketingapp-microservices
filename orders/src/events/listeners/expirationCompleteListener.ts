import {
  Subjects,
  expirationCompleteEvent,
  Listener,
  OrderStatus
} from '@a4hticket/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order.model';
import { natsWrapper } from '../../nats-wrapper';
import { OrderCancelledPublisher } from '../publishers/orderCancelledPub';
import { queueGroupName } from './queue-group-name';

export class expirationCompleteListener extends Listener<expirationCompleteEvent> {
  subject: Subjects.expirationComplete = Subjects.expirationComplete;
  queueGroupName = queueGroupName.orderService;
  async onMessage(data: expirationCompleteEvent['data'], msg: Message) {
    const { orderId } = data;
    const order = await Order.findById(orderId).populate('ticket');
    if (!order) {
      throw new Error('Order not found!');
    }
    if (order.status === OrderStatus.Completed) {
      return msg.ack();
    }
    order.set({
      status: OrderStatus.Cancelled
    });

    await order.save();
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id
      },
      version: order.version
    });
    return msg.ack();
  }
}
