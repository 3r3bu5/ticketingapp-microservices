import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { APIError } from '@a4hticket/common';

const signin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(new APIError('Authentication Error: ' + err));
    }
    if (!user) {
      return next(new APIError('Authentication Error: Incorrect credentials '));
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(new APIError('Authentication Error: ' + err));
      }
      const userJWT = jwt.sign(
        {
          id: user._id,
          email: user.email
        },
        process.env.JWT_KEY!
      );
      req.session = {
        jwt: userJWT
      };
      return res.status(200).json(user);
    });
  })(req, res, next);
};

export { signin as signinCtrl };
