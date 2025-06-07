import userSchema from '../validations/user.schema';
import { UserRepository } from '../data-access/user.repository';
import { User } from './dto';
import { AuthService } from '@libraries/auth/auth.service';

export class UserService {
  private userRepo = new UserRepository();
  private authService = new AuthService();

  async createUser(userData: User) {
    const validated = userSchema.parse(userData);

    const savedUser = await this.userRepo.insertUser(validated);

    const token = this.authService.generateToken(savedUser._id.toString());

    return {
      ...savedUser.toObject(),
      token,
    };
  }
}
