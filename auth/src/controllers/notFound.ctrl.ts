import { NextFunction, Request, Response } from 'express';
import { notFoundError } from '@a4hticket/common';

const notFoundCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw new notFoundError();
};

export { notFoundCtrl };
