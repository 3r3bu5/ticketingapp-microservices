import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

import { updateTicket } from '../controllers/update.ctrl';
import { requireAuth } from '@a4hticket/common';
import { ticketValidation } from '../validation/ticket';

router.put(
  '/api/tickets/:id',
  requireAuth as any,
  ticketValidation,
  updateTicket as any
);

export { router as updateTicketRouter };
