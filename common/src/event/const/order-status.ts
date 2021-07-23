 export enum OrderStatus {
     Created = "created",                   // when the order has been created but the ticket has not been reserved
     AwaitingPayment = "awaiting:payment",  // when the order successfully reserved the ticket but waiting to be paid by the user
     Cancelled = "cancelled",               // The ticket the order has been already reserved || the user cancelled the order || the order expired before payment 
     Completed = "completed",               // when the order successfully reserved the ticket and the payment was successful
 }