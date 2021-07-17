import { NextFunction, Request, Response } from 'express';
import { User } from '../model/user.model';
import { APIError } from '@a4hticket/common';
import jwt from 'jsonwebtoken';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.register(
      new User({
        email: req.body.email
      }),
      req.body.password
    );
    const savedUser = await user.save();
    // create JWT and store it in the cookie
    const userJWT = jwt.sign(
      {
        id: savedUser._id,
        email: savedUser.email
      },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: userJWT
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(savedUser);
  } catch (err) {
    return next(new APIError('Authentication Error: ' + err.message));
  }
};

export { signup as signupCtrl };
