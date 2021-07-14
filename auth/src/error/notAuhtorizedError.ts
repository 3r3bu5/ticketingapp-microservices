import { customError } from './customError';

export class notAuthorizedError extends customError {
  reason = 'Not Authorized!, Please login first';
  statusCode = 401;
  constructor() {
    super('Not Authorized!, Please login first');
    Object.setPrototypeOf(this, notAuthorizedError.prototype);
    Error.captureStackTrace(this);
  }
  serializeErrors() {
    return [
      {
        message: this.reason
      }
    ];
  }
}
