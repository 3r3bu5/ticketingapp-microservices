import {NextFunction, Request, Response} from 'express'
import { User } from '../model/user.model'
import { APIError } from '../error/APIError';

const signup = async (req: Request , res: Response, next: NextFunction) => {
    try {
        const user = await User.register(
          new User({
            email: req.body.email,
          }), req.body.password
          );
        const savedUser = await user.save();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ success: true, msg: 'Registration Successful!' });
      } catch (err) {
        return next(new APIError('Authentication Error: ' + err.message))
    }
}

export {signup as signupCtrl}