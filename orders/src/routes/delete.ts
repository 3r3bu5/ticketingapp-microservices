import express from 'express';
const router = express.Router();

import { deleteOne } from '../controllers/delete.ctrl';

router.delete('/api/orders/:id', deleteOne);

export { router as deleteOneRouter };