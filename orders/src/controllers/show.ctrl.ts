import { NextFunction, Request, Response } from 'express';

const getOneCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('show')
};

export { getOneCtrl };
