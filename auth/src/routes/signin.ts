import express from 'express';
const router = express.Router();
import { signinCtrl } from '../controllers/signin.ctrl';
import { authValidation } from '@a4hticket/common';

router.post('/api/users/signin', authValidation as any, signinCtrl);

export { router as signinRouter };
