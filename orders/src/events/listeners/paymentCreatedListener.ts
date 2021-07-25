import {
  Subjects,
  PaymentCreatedEvent,
  Listener,
  OrderStatus
} from '@a4hticket/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order.model';
import { queueGroupName } from './queue-group-name';

export class paymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.paymentCreated = Subjects.paymentCreated;
  queueGroupName = queueGroupName.orderService;
  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const { orderId } = data;
    const order = await Order.findById(orderId).populate('ticket');
    if (!order) {
      throw new Error('Order not found!');
    }
    order.set({
      status: OrderStatus.Completed
    });

    await order.save();
    return msg.ack();
  }
}
