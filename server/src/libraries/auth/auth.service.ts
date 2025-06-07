import jwt from 'jsonwebtoken';
import config from 'config';

export class AuthService {
  generateToken(userId: string) {
    return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '7d' });
  }

  verifyToken(token: string) {
    return jwt.verify(token, config.jwtSecret) as { id: string };
  }
}
