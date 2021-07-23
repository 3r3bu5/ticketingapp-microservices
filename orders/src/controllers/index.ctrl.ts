import { NextFunction, Request, Response } from 'express';

const getOrderCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('index');
};

export { getOrderCtrl };
