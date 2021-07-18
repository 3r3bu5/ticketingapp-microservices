import { notFoundError } from '@a4hticket/common';
import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../../src/model/ticket.model';


interface RequestWithUser extends Request {
  currentUser: {
    id: string,
    email: string
  } // or any other type
}

const showTicket = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
         throw new notFoundError()
    }
    return res.status(200).send(ticket)
};

export { showTicket };
