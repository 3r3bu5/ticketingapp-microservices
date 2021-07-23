import { requireAuth } from '@a4hticket/common';
import express from 'express';
const router = express.Router();

import { getOneCtrl } from '../controllers/show.ctrl';

router.get('/api/orders/:id', requireAuth as any, getOneCtrl as any);

export { router as getOneRouter };
