import express from 'express';
const router = express.Router();

import { getOneCtrl } from '../controllers/show.ctrl';

router.get('/api/orders/:id', getOneCtrl);

export { router as getOneRouter };
