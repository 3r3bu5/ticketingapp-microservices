import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../../src/model/ticket.model';
import { TicketCreatedPublisher } from '../events/publishers/ticketCreatedPub';
import { natsWrapper } from '../nats-wrapper';

interface RequestWithUser extends Request {
  currentUser: {
    id: string;
    email: string;
  }; // or any other type
}

const createNewTicketCtrl = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const ticket = Ticket.build({ ...req.body, userId: req.currentUser!.id });
  const savedTicket = await ticket.save();
  new TicketCreatedPublisher(natsWrapper.client).publish({
    id: savedTicket.id,
    title: savedTicket.title,
    price: savedTicket.price,
    userId: savedTicket.userId
  });
  res.status(201).send(ticket);
};

export { createNewTicketCtrl };
