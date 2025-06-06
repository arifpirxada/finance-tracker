import { Request, Response, NextFunction } from 'express';
import BaseError from './BaseError';

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

//   const isOperational = err instanceof BaseError && err.isOperational;

  const statusCode =
    err instanceof BaseError ? err.statusCode : 500;

  const message =
    err instanceof BaseError
      ? err.message
      : 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};