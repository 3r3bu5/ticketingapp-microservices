import {
  OrderCancelled,
  Subjects,
  Listener,
  OrderStatus
} from '@a4hticket/common';
import { Message } from 'node-nats-streaming';
import { queuGroupName } from './queuGroupName';
import { Order } from '../../model/order.model';

export class OrderCancelledListener extends Listener<OrderCancelled> {
  subject: Subjects.orderCancelled = Subjects.orderCancelled;
  queueGroupName = queuGroupName;

  async onMessage(data: OrderCancelled['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1
    });

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}
