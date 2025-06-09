import jwt from 'jsonwebtoken';
import config from 'config';
import { HttpStatusCode } from 'types';
import BaseError from '@libraries/errors/BaseError';

export class AuthService {
  generateToken(userId: string) {
    return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '7d' });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, config.jwtSecret) as { id: string };
    } catch {
      throw new BaseError(
        'auth',
        HttpStatusCode.UNAUTHORIZED,
        'Invalid access token'
      );
    }
  }
}
