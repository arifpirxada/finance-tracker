import BaseError from '@libraries/errors/BaseError';
import { registerInput } from '../domain/dto';
import UserModel from './user.modal';
import { HttpStatusCode } from 'types';

export class UserRepository {
  async insertUser(input: registerInput) {
    const newUser = new UserModel(input);

    try {
      return await newUser.save();
    } catch (err: any) {
      if (err.code === 11000) {
        throw new BaseError(
          'DuplicateFieldError',
          HttpStatusCode.BAD_REQUEST,
          `The email: '${err.keyValue['email']}' is already in use.`
        );
      }

      throw new BaseError(
        'DatabaseError',
        500,
        'Database error occurred. Please try again later.'
      );
    }
  }

  async findUser(email: string) {
    const user = await UserModel.findOne({ email });

    return user;
  }
}
