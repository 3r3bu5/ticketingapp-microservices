import { Subjects } from "../const/subjects";

export interface TicketCreatedEvent {
    subject: Subjects.ticketCreated,
    data : {
        id: string,
        title: string,
        price: number,
        userId: string,
        version: number,
    }
}