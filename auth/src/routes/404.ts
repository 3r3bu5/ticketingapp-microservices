import express from "express";
const router = express.Router()

import {notFoundCtrl} from '../controllers/notFound.ctrl'

router.all('*', notFoundCtrl)


export {router as notFoundRouter}