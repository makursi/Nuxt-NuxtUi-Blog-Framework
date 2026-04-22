import { z } from 'zod';

// Login validation schema
export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Register validation schema
export const registerSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Export TypeScript types from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
