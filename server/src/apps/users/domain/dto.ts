import { z } from 'zod';
import { registerSchema, loginSchema } from '../validations/user.schema';

export type registerInput = z.infer<typeof registerSchema>;
export type loginInput = z.infer<typeof loginSchema>;
