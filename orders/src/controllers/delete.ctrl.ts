import { NextFunction, Request, Response } from 'express';

const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('delete')
};

export { deleteOne };
