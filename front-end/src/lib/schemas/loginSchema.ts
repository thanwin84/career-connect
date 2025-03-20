import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please provide valid email'),
  password: z
    .string()
    .min(1, 'password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
