import {Request, Response, NextFunction} from 'express'
import { notAuthorizedError } from '../error/notAuhtorizedError';

export const requireAuth = (req: Request , res: Response, next:NextFunction) => {
    if (!req.currentUser ) {
        throw new notAuthorizedError()
    }
    next()
}

