import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../../src/model/ticket.model';

interface RequestWithUser extends Request {
  currentUser: {
    id: string,
    email: string
  } // or any other type
}

const createNewTicketCtrl = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
    const ticket = Ticket.build({...req.body, userId: req.currentUser!.id})
    await ticket.save()
    res.status(201).send(ticket)
};

export { createNewTicketCtrl };
