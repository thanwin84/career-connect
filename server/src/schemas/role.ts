import { z } from 'zod';
import { validId } from '../utils';

export const roleSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  permissions: z.array(z.string(), {
    message: 'permissions must be an array of string',
  }),
});

export const removeRoleSchema = z.object({
  roleId: validId('roleId'),
  userId: validId('userId'),
});

export const addRoleSchema = z.object({
  roleId: validId('roleId'),
  userId: validId('userId'),
});
