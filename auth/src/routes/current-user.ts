import express from "express";
import { currentuserCtrl } from "../controllers/current-user.ctrl";

const router = express.Router()
router.get('/api/users/currentuser', currentuserCtrl )


export {router as currentUserRouter}