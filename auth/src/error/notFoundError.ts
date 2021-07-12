import { customError } from './customError';

export class notFoundError extends customError {
    reason = 'NOT FOUND!'
    statusCode = 404
    constructor() {
      super();
      Object.setPrototypeOf(this, notFoundError.prototype);
      Error.captureStackTrace(this);
    }
    serializeErrors () {

        return [
            {
                message: this.reason
            }
        ]
    }
  }
  