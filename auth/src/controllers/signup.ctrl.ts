import {Request, Response} from 'express'
import { User } from '../model/user.model'

const signup = async (req: Request , res: Response) => {
    const user = await User.findOne({email: req.body.email})
    if (!user) {
       const newUser = User.build(req.body)
       await newUser.save()
       res.json(newUser)
    } else {
        res.json({message: "User already exists"})
    }
}

export {signup as signupCtrl}