import express from "express";
const router = express.Router()
import {signinCtrl} from '../controllers/signin.ctrl'
import { authValidation } from "../middleware/validation";
import passport from 'passport'

router.post('/api/users/signin', authValidation ,signinCtrl)


export {router as signinRouter}