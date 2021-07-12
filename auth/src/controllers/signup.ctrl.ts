import {Request, Response} from 'express'
import { DBConnectionError } from '../error/dbError'
const signup = (req: Request , res: Response) => {
    throw new DBConnectionError()
    res.json(req.body)
}

export {signup as signupCtrl}