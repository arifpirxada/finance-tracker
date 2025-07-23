import { z } from 'zod';

const addAccountSchema = z.object({
  name: z.string().trim(),
  type: z.enum(['Cash', 'Bank account', 'Other']),
  balance: z.coerce.number(),
});

const updateAccountSchema = z.object({
  name: z.string().optional(),
  type: z.enum(['Cash', 'Bank account', 'Other']).optional(),
  balance: z.number().optional(),
});

export type AddAccountInput = z.infer<typeof addAccountSchema>;
export type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;

export { addAccountSchema, updateAccountSchema };