import { APIError, notAuthorizedError, notFoundError } from '@a4hticket/common';
import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../../src/model/ticket.model';
import { TicketUpdatedPublisher } from '../events/publishers/ticketUpdatedPub';
import { natsWrapper } from '../nats-wrapper';

interface RequestWithUser extends Request {
  currentUser: {
    id: string;
    email: string;
  }; // or any other type
}

const updateTicket = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new notFoundError();
  }
  if (ticket.userId !== req.currentUser.id) {
    throw new notAuthorizedError();
  }
  if (ticket.orderId) {
    throw new APIError('Cannot edit a reserved ticket');
  }
  if (req.body.title) {
    ticket.title = req.body.title;
  }
  if (req.body.price) {
    ticket.price = req.body.price;
  }
  const updateTicket = await ticket.save();
  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: updateTicket.id,
    title: updateTicket.title,
    price: updateTicket.price,
    userId: updateTicket.userId,
    version: updateTicket.version
  });
  return res.status(200).send(updateTicket);
};

export { updateTicket };
