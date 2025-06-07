import { z } from 'zod';

const accountSchema = z.object({
  name: z.string().trim(),
  type: z.enum(['Cash', 'Bank account', 'Other']),
  balance: z.number().default(0),
});

const userSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  accounts: z.array(accountSchema).default([]),
  tags: z.array(z.string()).default([]),
});

export type UserInput = z.infer<typeof userSchema>;

export default userSchema;
