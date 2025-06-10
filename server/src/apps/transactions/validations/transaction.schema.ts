import { z } from 'zod';

const addTransactionSchema = z
  .object({
    userId: z.string(),
    amount: z.number().min(0),
    note: z.string().optional(),
    account: z.string(), // from account id
    toAccount: z.string().optional(), // to account id
    type: z.enum(['expense', 'income', 'transfer']),
    tags: z.array(z.string().optional()),
    date: z.date(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'transfer' && !data.toAccount) {
      ctx.addIssue({
        path: ['toAccount'],
        code: z.ZodIssueCode.custom,
        message: 'toAccount is required when type is "transfer".',
      });
    }
  });

const updateTransactionSchema = z
  .object({
    transactionId: z.string(),
    amount: z.number().min(0).optional(),
    note: z.string().optional(),
    account: z.string().optional(),
    toAccount: z.string().optional(),
    type: z.enum(['expense', 'income', 'transfer']).optional(),
    tags: z.array(z.string()).optional(),
    date: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'transfer' && !data.toAccount) {
      ctx.addIssue({
        path: ['toAccount'],
        code: z.ZodIssueCode.custom,
        message: 'toAccount is required when type is "transfer".',
      });
    }
    if (data.type !== 'transfer' && data.toAccount) {
      ctx.addIssue({
        path: ['toAccount'],
        code: z.ZodIssueCode.custom,
        message: 'toAccount should only be provided for transfers.',
      });
    }
  });

const getTransactionsQuerySchema = z.object({
  type: z.enum(['income', 'expense', 'transfer']).optional(),
  account: z.string().optional(),
  toAccount: z.string().optional(),
  from: z.string().optional(), // ISO string
  to: z.string().optional(), // ISO string
  amountFrom: z.coerce.number().optional(),
  amountTo: z.coerce.number().optional(),
  search: z.string().optional(), // to match `note`
  tags: z
    .union([
      z.array(z.string()), // tags=food&tags=travel
      z.string().transform((tag) => [tag]), // tags=food
    ])
    .optional(),
  skip: z.coerce.number().default(0).optional(),
  limit: z.coerce.number().max(100).default(20).optional(),
});

export {
  addTransactionSchema,
  updateTransactionSchema,
  getTransactionsQuerySchema,
};
