import express from 'express';
import { signoutCtrl } from '../controllers/signout.ctrl';

const router = express.Router();

router.post('/api/users/signout', signoutCtrl);

export { router as signoutRouter };
