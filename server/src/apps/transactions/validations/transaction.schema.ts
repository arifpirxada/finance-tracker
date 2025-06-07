import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z.custom<Types.ObjectId>(
  (val) => {
    return Types.ObjectId.isValid(val);
  },
  {
    message: 'Invalid ObjectId',
  }
);

const transactionSchema = z
  .object({
    userId: objectIdSchema,
    amount: z.number().min(0),
    note: z.string().optional(),
    account: objectIdSchema,
    toAccount: objectIdSchema,
    type: z.enum(['expense', 'income', 'transfer']),
    tags: z.array(z.string().optional()),
    data: z.date(),
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

export default transactionSchema;
