import { publisher, Subjects, PaymentCreatedEvent } from '@a4hticket/common';
export class paymentCreatedPub extends publisher<PaymentCreatedEvent> {
  subject: Subjects.paymentCreated = Subjects.paymentCreated;
}
