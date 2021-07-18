import express from 'express';

const router = express.Router();

import { showTickets } from '../controllers/index.ctrl';

router.get('/api/tickets', showTickets as any);

export { router as showTicketsRouter };
