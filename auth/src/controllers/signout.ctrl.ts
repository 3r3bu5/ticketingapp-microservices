import {Request, Response} from 'express'

const signout = (req: Request , res: Response) => {
    res.json({message: "signout"})
}

export {signout as signoutCtrl}