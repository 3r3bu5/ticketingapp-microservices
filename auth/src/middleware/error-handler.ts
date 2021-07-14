import { Request, Response, NextFunction } from 'express';
import { customError } from '../error/customError';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof customError) {
    return res.status(error.statusCode).json({
      errors: error.serializeErrors()
    });
  }
  return res.status(400).json({
    errors: [
      {
        message: error.message || 'Something went wrong'
      }
    ]
  });
};
export { errorHandler };
