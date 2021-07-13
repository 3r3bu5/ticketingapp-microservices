import { customError } from './customError';

export class DBConnectionError extends customError {
    reason = 'Error connecting to DB'
    statusCode = 500
    constructor() {
      super("Error connecting to DB");
      Object.setPrototypeOf(this, DBConnectionError.prototype);
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
  