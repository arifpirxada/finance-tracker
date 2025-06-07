import userModel from './user.modal';
import { UserInput } from '../validations/user.schema';

export class UserRepository {
  async insertUser(user: UserInput) {
    const newUser = new userModel(user);

    return await newUser.save();
  }
}
