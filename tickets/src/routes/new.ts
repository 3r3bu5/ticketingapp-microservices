import express, {Request, Response, NextFunction} from 'express'

const router = express.Router();

import { createNewTicketCtrl } from '../controllers/new.ctrl';
import {requireAuth} from '@a4hticket/common'
import { ticketValidation } from '../validation/ticket';

router.post('/api/tickets', requireAuth as any , ticketValidation , createNewTicketCtrl as any);

export { router as createNewTicket };
