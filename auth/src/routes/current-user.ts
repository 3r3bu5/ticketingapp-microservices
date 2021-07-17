import express from 'express';
import { currentuserCtrl } from '../controllers/current-user.ctrl';
import {currentUser} from '@a4hticket/common';

const router = express.Router();
router.get('/api/users/currentuser', currentUser as any, currentuserCtrl);

export { router as currentUserRouter };
