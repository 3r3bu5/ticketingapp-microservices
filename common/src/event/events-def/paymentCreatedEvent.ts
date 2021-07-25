import { Subjects } from "../const/subjects";

export interface PaymentCreatedEvent {
    subject: Subjects.paymentCreated,
    data : {
        id: string,
        orderId: string,
        stripeId: string,
        
    }
}