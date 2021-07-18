import express, {Request, Response, NextFunction} from 'express'

const router = express.Router();

import { showTicket } from '../controllers/show.ctrl';
import {requireAuth} from '@a4hticket/common'

router.get('/api/tickets/:id', requireAuth as any , showTicket as any);

export { router as showTicketRouter };
