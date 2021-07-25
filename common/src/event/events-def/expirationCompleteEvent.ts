import { Subjects } from "../const/subjects";

export interface expirationCompleteEvent {
    subject: Subjects.expirationComplete,
    data : {
        orderId: string,
    }
}