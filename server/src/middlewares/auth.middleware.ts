import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@libraries/auth/auth.service';
import { HttpStatusCode } from 'types';
import BaseError from '@libraries/errors/BaseError';
import { JwtPayload } from 'types';

const authService = new AuthService();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    throw new BaseError(
      'auth',
      HttpStatusCode.UNAUTHORIZED,
      'No access token provided'
    );
  }

  const decoded = authService.verifyToken(token) as JwtPayload;

  if (!decoded || !decoded.id) {
    throw new BaseError(
      'auth',
      HttpStatusCode.UNAUTHORIZED,
      'Invalid access token'
    );
  }

  req.userId = decoded.id;
  next();
};

export default auth;
