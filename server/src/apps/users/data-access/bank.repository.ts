import BaseError from '@libraries/errors/BaseError';
import { accountInput, updateAccountInput } from '../domain/dto';
import UserModel from './user.modal';
import { HttpStatusCode } from 'types';

export class BankRepository {
  async addAccount(userId: string, accountInput: accountInput) {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { accounts: accountInput } },
      {
        new: true,
        projection: { _id: 1 },
      }
    );

    if (!updatedUser) {
      throw new BaseError(
        'add account',
        HttpStatusCode.NOT_FOUND,
        'User not found'
      );
    }

    return true;
  }

  async updateAccount(
    userId: string,
    _id: string,
    fieldsToUpdate: updateAccountInput
  ) {
    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new BaseError(
        'update account',
        HttpStatusCode.BAD_REQUEST,
        'No fields provided to update'
      );
    }

    // Prefix all keys with 'accounts.$.' for nested update
    type UpdatableAccountFields = Pick<
      updateAccountInput,
      'name' | 'type' | 'balance'
    >;

    const updateFields: Record<string, any> = {};
    const allowedFields: (keyof UpdatableAccountFields)[] = [
      'name',
      'type',
      'balance',
    ];

    for (const key of allowedFields) {
      if (fieldsToUpdate[key] !== undefined) {
        updateFields[`accounts.$.${key}`] = fieldsToUpdate[key];
      }
    }

    const result = await UserModel.updateOne(
      {
        _id: userId,
        'accounts._id': _id,
      },
      {
        $set: updateFields,
      }
    );

    if (result.matchedCount === 0) {
      throw new BaseError('update account', 404, 'Account not found');
    }

    return true;
  }

  async deleteAccount(userId: string, accountId: string) {
    const result = await UserModel.updateOne(
      { _id: userId },
      { $pull: { accounts: { _id: accountId } } }
    );

    if (result.matchedCount === 0) {
      throw new BaseError('delete account', 404, 'User not found');
    }

    return true;
  }
}
