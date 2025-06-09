import mongoose from 'mongoose';
import { addTransactionInput } from '../domain/dto';
import TransactionModel from './transaction.modal';
import BaseError from '@libraries/errors/BaseError';
import { HttpStatusCode } from 'types';
import UserModel from '@apps/users/data-access/user.modal';
import { toObjectId } from './transaction.helper';

export class TransactionRepository {
  async insertTransaction(input: addTransactionInput) {
    const session = await mongoose.startSession();

    async function checkBalance(
      userId: string,
      accountId: string,
      amount: number
    ) {
      const account = await UserModel.findOne(
        { _id: userId, 'accounts._id': accountId },
        { 'accounts.$': 1 }
      );

      const currentBalance = account?.accounts[0]?.balance ?? 0;

      if (currentBalance + amount < 0) {
        throw new BaseError(
          'Insufficient balance',
          HttpStatusCode.BAD_REQUEST,
          'Account balance cannot go negative'
        );
      }
    }

    async function updateBalance(
      userId: string,
      accountId: string,
      amount: number
    ) {
      // Check balance
      if (amount < 0) {
        await checkBalance(userId, accountId, amount);
      }

      // Update balance
      await UserModel.updateOne(
        { _id: toObjectId(userId), 'accounts._id': toObjectId(accountId) },
        { $inc: { 'accounts.$.balance': amount } },
        { session }
      );
    }

    try {
      session.startTransaction();

      // Save transaction
      const newTransaction = new TransactionModel(input);

      await newTransaction.save({ session });

      // Update user account balance

      if (input.type === 'expense') {
        await updateBalance(
          input.userId.toString(),
          input.account.toString(),
          -input.amount
        );
      } else if (input.type === 'income') {
        await updateBalance(
          input.userId.toString(),
          input.account.toString(),
          input.amount
        );
      } else if (input.type === 'transfer') {
        if (!input.toAccount || input.toAccount === input.account) {
          throw new BaseError(
            'Transfer Validation',
            HttpStatusCode.BAD_REQUEST,
            'Invalid target account for transfer'
          );
        }

        await updateBalance(
          input.userId.toString(),
          input.account.toString(),
          -input.amount
        );
        await updateBalance(
          input.userId.toString(),
          input.toAccount.toString(),
          input.amount
        );
      }

      await session.commitTransaction();
      return newTransaction._id;
    } catch (err) {
      await session.abortTransaction();
      throw new BaseError(
        'Insert transaction session',
        HttpStatusCode.INTERNAL_SERVER,
        'Failed to insert transaction and update user account balance'
      );
    } finally {
      session.endSession();
    }
  }

  async getTransactions(filter: any, skip: number, limit: number) {
    const transactions = await TransactionModel.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    let totalCount: number | undefined = undefined;

    if (skip === 0) {
      totalCount = await TransactionModel.countDocuments(filter);
    }

    return {
      totalCount,
      transactions,
    };
  }
}
