import { z } from 'zod';
import { accountSchema } from './bank.schema';

const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  accounts: z.array(accountSchema).default([]),
  currency: z.string(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

export { registerSchema, loginSchema };
