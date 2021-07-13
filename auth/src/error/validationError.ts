import { ValidationError } from 'joi'
import { customError } from './customError';

export class validationError extends customError {
    statusCode = 400
    constructor(public error: ValidationError) {
      super("Validation Error!");
      Object.setPrototypeOf(this, validationError.prototype);
      Error.captureStackTrace(this);
    }
    serializeErrors () {
      return this.error.details.map(error => {
                return {message: error.message, field: error.path[0].toString()}       
      })
  }
}