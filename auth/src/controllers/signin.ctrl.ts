import {Request, Response} from 'express'

const signin = (req: Request , res: Response) => {
    res.json(req.body)
}

export {signin as signinCtrl}