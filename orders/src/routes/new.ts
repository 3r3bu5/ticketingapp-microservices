import express from 'express';
import { requireAuth } from '@a4hticket/common';
import { newOrder } from '../controllers/new.ctrl';
import { ordersValidation } from '../validation/order';
const router = express.Router();

router.post('/api/orders', requireAuth as any, ordersValidation, newOrder);

export { router as newOrderRouter };
