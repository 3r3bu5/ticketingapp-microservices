import { Subjects, OrderCreated, publisher } from '@a4hticket/common';

export class OrderCreatedPublisher extends publisher<OrderCreated> {
  subject: Subjects.orderCreated = Subjects.orderCreated;
}
