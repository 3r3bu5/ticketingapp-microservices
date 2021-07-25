import Joi from 'joi';
import { Request, Response } from 'express';
import { validationError } from '@a4hticket/common';

let schema: any;

function chargeValidation(req: Request, res: Response, next: any) {
  if (req.route.path === '/api/payments' && req.method === 'POST') {
    schema = Joi.object({
      token: Joi.string().required(),
      orderId: Joi.string().required()
    });
  }

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };

  // validate request body against schema

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    let errorToSent = new validationError(error);
    return next(errorToSent);
  } else {
    req.body = value;
    next();
  }
}

export { chargeValidation };
