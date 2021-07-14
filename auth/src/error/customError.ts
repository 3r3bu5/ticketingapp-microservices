export abstract class customError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, customError.prototype);
    Error.captureStackTrace(this);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
