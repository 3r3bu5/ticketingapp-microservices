import { requireAuth } from '@a4hticket/common';
import express from 'express';
const router = express.Router();

import { chargeCtrl } from '../controllers/new.ctrl';
import { chargeValidation } from '../validation/charge';

router.post(
  '/api/payments',
  requireAuth as any,
  chargeValidation,
  chargeCtrl as any
);

export { router as createChargeRouter };
