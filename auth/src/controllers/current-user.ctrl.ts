import {Request, Response} from 'express'

const currentuser = (req: Request ,res: Response) => {
    res.json({message: "currentuser"})
}

export { currentuser as currentuserCtrl}