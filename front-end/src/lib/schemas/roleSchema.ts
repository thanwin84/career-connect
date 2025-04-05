import { z } from 'zod';

export const roleSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  permissions: z.array(z.string(), {
    message: 'permissions must be an array of string',
  }),
});

export type RoleFormType = z.infer<typeof roleSchema>;
