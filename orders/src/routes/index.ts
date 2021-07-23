import express from 'express';
const router = express.Router();

import { getOrderCtrl } from '../controllers/index.ctrl';
import { requireAuth } from '@a4hticket/common';
router.get('/api/orders', requireAuth as any, getOrderCtrl as any);

export { router as getOrderRouter };
