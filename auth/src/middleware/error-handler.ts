import {Request, Response, NextFunction} from 'express'
const errorHandler = (error: Error, req: Request, res: Response, next:NextFunction) => {
    res.setHeader('Content-Type', 'application/json');
    res.status( 400 )
    res.json({
      success: false,
      err: error.message
    });
  };
export { errorHandler}