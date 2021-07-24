import { Subjects } from "../const/subjects";

export interface OrderCancelled {
    subject: Subjects.orderCancelled,
    data : {
        id: string,
        version: number,
        ticket: {
            id: string,
        }
    }
}