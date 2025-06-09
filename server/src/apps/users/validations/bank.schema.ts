import { z } from 'zod';

const accountSchema = z.object({
  name: z.string().trim(),
  type: z.enum(['Cash', 'Bank account', 'Other']),
  balance: z.number().default(0),
});

const updateAccountSchema = z.object({
  name: z.string().optional(),
  type: z.enum(['Cash', 'Bank account', 'Other']).optional(),
  balance: z.number().optional(),
});

export { accountSchema, updateAccountSchema };
