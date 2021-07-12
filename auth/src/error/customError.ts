export abstract class customError extends Error {
    abstract statusCode: number
    constructor() {
      super();
      Object.setPrototypeOf(this, customError.prototype);
      Error.captureStackTrace(this);
    }
    abstract serializeErrors(): {message:string, field?:string}[];
}