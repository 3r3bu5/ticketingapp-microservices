import { Subjects, TicketCreatedEvent, publisher } from '@a4hticket/common';

export class TicketCreatedPublisher extends publisher<TicketCreatedEvent> {
  subject: Subjects.ticketCreated = Subjects.ticketCreated;
}
