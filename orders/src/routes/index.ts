import express from 'express';
const router = express.Router();

import { getOrderCtrl } from '../controllers/index.ctrl';

router.get('/api/orders', getOrderCtrl);

export { router as getOrderRouter };