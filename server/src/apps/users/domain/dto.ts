import { z } from 'zod';
import { registerSchema, loginSchema } from '../validations/user.schema';
import { accountSchema, updateAccountSchema } from '../validations/bank.schema';

export type registerInput = z.infer<typeof registerSchema>;
export type loginInput = z.infer<typeof loginSchema>;
export type accountInput = z.infer<typeof accountSchema>;
export type updateAccountInput = z.infer<typeof updateAccountSchema>;
