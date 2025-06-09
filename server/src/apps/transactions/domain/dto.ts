import { z } from 'zod';
import { addTransactionSchema, updateTransactionSchema, getTransactionsQuerySchema } from '../validations/transaction.schema';

export type addTransactionInput = z.infer<typeof addTransactionSchema>;
export type updateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type getTransactionsInput = z.infer<typeof getTransactionsQuerySchema>