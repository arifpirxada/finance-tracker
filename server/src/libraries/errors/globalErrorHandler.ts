import BaseError from './BaseError';

export const handleGlobalError = (error: unknown) => {
  console.error('Global Error:', error);

  if (error instanceof BaseError && !error.isOperational) {
    process.exit(1);
  }
};
