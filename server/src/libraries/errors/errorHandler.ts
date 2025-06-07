import { NextFunction, Request, Response } from 'express';
import BaseError from './BaseError';
import { HttpStatusCode } from 'types';

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  //   const isOperational = err instanceof BaseError && err.isOperational;

  const statusCode =
    err instanceof BaseError ? err.statusCode : HttpStatusCode.INTERNAL_SERVER;

  const message =
    err instanceof BaseError ? err.message : 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
