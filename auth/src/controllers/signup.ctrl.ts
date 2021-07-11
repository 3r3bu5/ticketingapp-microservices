import {Request, Response} from 'express'

const signup = (req: Request , res: Response) => {
    res.json(req.body)
}

export {signup as signupCtrl}