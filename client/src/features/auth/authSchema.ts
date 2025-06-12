import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password is too short"),
  currency: z.string(),
  accountName: z.string().min(2, "Account name is too short"),
  accountType: z.enum(['Cash', 'Bank account', 'Other']),
  accountBalance: z.coerce.number().min(0, "Balance can't be negative")
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password is too short"),
});

export type LoginInput = z.infer<typeof loginSchema>;