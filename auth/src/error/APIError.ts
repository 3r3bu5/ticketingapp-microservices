import { customError } from './customError';

export class APIError extends customError {
  statusCode = 400;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, APIError.prototype);
    Error.captureStackTrace(this);
  }
  serializeErrors() {
    return [
      {
        message: this.message
      }
    ];
  }
}
