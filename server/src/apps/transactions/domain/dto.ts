import { z } from 'zod';
import {
  addTransactionSchema,
  updateTransactionSchema,
  getTransactionsQuerySchema,
} from '../validations/transaction.schema';
import { Types } from 'mongoose';

export type GetTransactionsInput = z.infer<typeof getTransactionsQuerySchema>;
export type AddTransactionInput = z.infer<typeof addTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type UpdateQuery = Omit<UpdateTransactionInput, 'transactionId'>;

export interface TransactionType {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  account: Types.ObjectId;
  toAccount?: Types.ObjectId | null;
  date: Date;
  tags: string[];
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}
