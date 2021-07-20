import { Subjects, TicketUpdatedEvent, publisher } from '@a4hticket/common';

export class TicketUpdatedPublisher extends publisher<TicketUpdatedEvent> {
  subject: Subjects.ticketUpdated = Subjects.ticketUpdated;
}
