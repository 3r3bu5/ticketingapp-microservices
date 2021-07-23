import { requireAuth } from '@a4hticket/common';
import express from 'express';
const router = express.Router();

import { deleteOne } from '../controllers/delete.ctrl';

router.delete('/api/orders/:id', requireAuth as any, deleteOne as any);

export { router as deleteOneRouter };
