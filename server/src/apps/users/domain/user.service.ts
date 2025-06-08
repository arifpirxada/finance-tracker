import { registerSchema, loginSchema } from '../validations/user.schema';
import { UserRepository } from '../data-access/user.repository';
import { registerInput, loginInput } from './dto';
import { AuthService } from '@libraries/auth/auth.service';
import BaseError from '@libraries/errors/BaseError';
import { HttpStatusCode } from 'types';
import bcrypt from 'bcryptjs';

export class UserService {
  private userRepo = new UserRepository();
  private authService = new AuthService();

  async createUser(userData: registerInput) {
    const validated = registerSchema.parse(userData);

    const savedUser = await this.userRepo.insertUser(validated);

    const token = this.authService.generateToken(savedUser._id.toString());

    return {
      ...savedUser.toObject(),
      token,
    };
  }

  async loginUser(input: loginInput) {
    const validated = loginSchema.parse(input); // zod validation

    const user = await this.userRepo.findUser(validated.email);

    if (!user) {
      throw new BaseError(
        'login',
        HttpStatusCode.UNAUTHORIZED,
        'Invalid credentials'
      );
    }

    const isPassMatch = await bcrypt.compare(validated.password, user.password);

    if (!isPassMatch) {
      throw new BaseError(
        'login',
        HttpStatusCode.UNAUTHORIZED,
        'Invalid credentials'
      );
    }

    // Generate token
    const token = this.authService.generateToken(user._id.toString());

    return {
      ...user.toObject(),
      token,
    };
  }
}
