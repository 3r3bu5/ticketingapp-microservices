import express from 'express';
import { currentuserCtrl } from '../controllers/current-user.ctrl';
import { currentUser } from '../middleware/currentUser';
const router = express.Router();
router.get('/api/users/currentuser', currentUser, currentuserCtrl);

export { router as currentUserRouter };
