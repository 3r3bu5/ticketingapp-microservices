import {NextFunction, Request, Response} from 'express'
import { notFoundError } from '../error/notFoundError';

 const notFoundCtrl = async (req:Request, res:Response, next:NextFunction) => {
    throw new notFoundError()
};

export { notFoundCtrl}