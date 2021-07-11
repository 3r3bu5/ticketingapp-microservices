import express from "express";
import { signupCtrl } from "../controllers/signup.ctrl";
import { authValidation } from "../middleware/validation";

const router = express.Router()

router.post('/api/users/signup', authValidation ,signupCtrl)


export {router as signupRouter}