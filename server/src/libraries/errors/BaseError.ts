import type { HttpStatusCode } from 'types';

class BaseError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    statusCode: HttpStatusCode,
    description: string,
    isOperational: boolean = true
  ) {
    super(description); // sets this.message = description

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export default BaseError;
