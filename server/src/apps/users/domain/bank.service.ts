import BaseError from '@libraries/errors/BaseError';
import { BankRepository } from '../data-access/bank.repository';
import { HttpStatusCode } from 'types';
import { accountInput, updateAccountInput } from './dto';
import { accountSchema, updateAccountSchema } from '../validations/bank.schema';
import mongoose from 'mongoose';

export class BankService {
  private bankRepo = new BankRepository();

  async addAccount(userId: string | undefined, accountInput: accountInput) {
    if (!userId) {
      throw new BaseError(
        'add account',
        HttpStatusCode.BAD_REQUEST,
        'Could not get user Id'
      );
    }

    const validated = accountSchema.parse(accountInput);

    const accountWithId = {
      _id: new mongoose.Types.ObjectId(),
      ...validated,
    };

    await this.bankRepo.addAccount(userId, accountWithId);

    return accountWithId._id;
  }

  async updateAccount(
    userId: string | undefined,
    accountId: string | undefined,
    updateInput: updateAccountInput
  ) {
    if (!userId) {
      throw new BaseError(
        'update account',
        HttpStatusCode.BAD_REQUEST,
        'Could not get user Id'
      );
    }

    if (!accountId) {
      throw new BaseError(
        'update account',
        HttpStatusCode.BAD_REQUEST,
        'Account Id not provided'
      );
    }

    const validated = updateAccountSchema.parse(updateInput);

    await this.bankRepo.updateAccount(userId, accountId, validated);

    return true;
  }

  async deleteAccount(
    userId: string | undefined,
    accountId: string | undefined
  ) {
    if (!userId) {
      throw new BaseError(
        'delete account',
        HttpStatusCode.BAD_REQUEST,
        'Could not get user Id'
      );
    }

    if (!accountId) {
      throw new BaseError(
        'delete account',
        HttpStatusCode.BAD_REQUEST,
        'Account Id not provided'
      );
    }

    await this.bankRepo.deleteAccount(userId, accountId);

    return true;
  }
}
