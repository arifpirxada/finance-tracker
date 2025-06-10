import { TransactionRepository } from '../data-access/transaction.repository';
import {
  addTransactionSchema,
  updateTransactionSchema,
} from '../validations/transaction.schema';
import {
  AddTransactionInput,
  GetTransactionsInput,
  UpdateTransactionInput,
} from './dto';

export class TransactionService {
  private transactionRepo = new TransactionRepository();

  async getTransactions(userId: string, query: GetTransactionsInput) {
    const filter: any = { userId };

    if (query.type) filter.type = query.type;
    if (query.account) filter.account = query.account;
    if (query.toAccount) filter.toAccount = query.toAccount;

    if (query.from || query.to) {
      filter.date = {};
      if (query.from) filter.date.$gte = new Date(query.from);
      if (query.to) filter.date.$lte = new Date(query.to);
    }

    if (query.amountFrom || query.amountTo) {
      filter.amount = {};
      if (query.amountFrom !== undefined) filter.amount.$gte = query.amountFrom;
      if (query.amountTo !== undefined) filter.amount.$lte = query.amountTo;
    }

    if (query.tags && query.tags.length > 0) {
      filter.tags = { $in: query.tags };
    }

    if (query.search) {
      filter.note = { $regex: query.search, $options: 'i' }; // case-insensitive
    }

    const skip = query.skip ?? 0;
    const limit = query.limit ?? 20;

    const data = await this.transactionRepo.getTransactions(
      filter,
      skip,
      limit
    );

    return data;
  }

  async addTransaction(transaction: AddTransactionInput) {
    const validated = addTransactionSchema.parse(transaction);
    const transactionId =
      await this.transactionRepo.insertTransaction(validated);

    return transactionId;
  }

  async updateTransaction(userId: string, transaction: UpdateTransactionInput) {
    const { transactionId, ...updateQuery } =
      updateTransactionSchema.parse(transaction);

    const updatedDoc = await this.transactionRepo.updateTransaction(
      userId,
      transactionId,
      updateQuery
    );

    return updatedDoc;
  }

  async deleteTransaction(userId: string, transactionId: string) {
    await this.transactionRepo.deleteTransaction(userId, transactionId);
  }
}
