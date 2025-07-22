import { z } from "zod";

export const addTransactionSchema = z
  .object({
    amount: z.coerce.number().min(0),
    note: z.string().optional(),
    account: z.string(), // from account id
    toAccount: z.string().optional(), // to account id
    type: z.enum(["expense", "income", "transfer"]),
    tags: z.array(z.string().optional()),
    date: z.date(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "transfer" && !data.toAccount) {
      ctx.addIssue({
        path: ["toAccount"],
        code: z.ZodIssueCode.custom,
        message: 'toAccount is required when type is "transfer".',
      });
    }
  });

export const updateTransactionSchema = z
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

export type AddTransactionInput = z.infer<typeof addTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
