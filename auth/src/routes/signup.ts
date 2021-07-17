import express from 'express';
import { signupCtrl } from '../controllers/signup.ctrl';
import { authValidation } from '@a4hticket/common';

const router = express.Router();

router.post('/api/users/signup', authValidation as any, signupCtrl);

export { router as signupRouter };
