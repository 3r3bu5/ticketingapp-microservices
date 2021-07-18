import Joi from 'joi';
import { Request, Response } from 'express';
import { validationError } from '@a4hticket/common';

let schema: any;

function ticketValidation(req: Request, res: Response, next: any) {
  if (req.route.path === '/api/tickets' && req.method === 'POST') {
    schema = Joi.object({
      title: Joi.string()
        .required()
        .min(6)
        .message('title must be a string with 6 chars minumum'),

      price: Joi.number()
        .integer()
        .required()
        .min(1)
        .max(9999999999)
        .message('price must be a positive number ')
    });
  }
  if (req.route.path === '/api/tickets/:id' && req.method === 'PUT') {
    schema = Joi.object({
      title: Joi.string()
        .min(6)
        .message('title must be a string with 6 chars minumum'),

      price: Joi.number()
        .integer()
        .min(1)
        .max(9999999999)
        .message('price must be a positive number ')
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

export { ticketValidation };
