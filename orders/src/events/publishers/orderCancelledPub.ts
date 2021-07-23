import { Subjects, OrderCancelled, publisher } from '@a4hticket/common';

export class OrderCancelledPublisher extends publisher<OrderCancelled> {
  subject: Subjects.orderCancelled = Subjects.orderCancelled;
}
