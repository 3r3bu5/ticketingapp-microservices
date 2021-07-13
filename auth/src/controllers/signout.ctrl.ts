import {Request, Response} from 'express'

const signout = (req: Request , res: Response) => {
   req.session = null
   res.send({})
}

export {signout as signoutCtrl}