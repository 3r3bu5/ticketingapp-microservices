import {Request, Response, NextFunction} from 'express'
import passport from 'passport'
import { APIError } from '../error/APIError';

const signin = (req: Request , res: Response, next:NextFunction) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
           return next( new APIError('Authentication Error: ' + err))
         }
        if (!user) {
            return next(new APIError('Authentication Error: Incorrect credentials '))
        }
        req.logIn(user, function(err) {
            if (err) {
                return next( new APIError('Authentication Error: ' + err))
             }
            return res.json({email: user.email});
        });
      })(req, res, next);
}

export {signin as signinCtrl}