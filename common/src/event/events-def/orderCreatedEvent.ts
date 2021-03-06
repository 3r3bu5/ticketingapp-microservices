import { OrderStatus } from "../const/order-status";
import { Subjects } from "../const/subjects";

export interface OrderCreated {
    subject: Subjects.orderCreated,
    data : {
        id: string,
        status: OrderStatus,
        expiresAt: string,
        version: number,
        userId: string,
        ticket: {
            id: string,
            price: number
        }
    }
}