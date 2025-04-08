import { z } from 'zod';
import { DateMixin, IDSchema, locationZodSchema } from './mixin';
import mongoose from 'mongoose';
import { validId } from '../utils';

export const companySchema = z.object({
  ...IDSchema.shape,
  ...DateMixin.shape,
  location: locationZodSchema,
  name: z
    .string({ required_error: 'Company is required' })
    .min(3, 'Company name must be at least 3 characters long'),
  description: z.string().optional(),
  role: z
    .array(z.string())
    .refine(
      (values) =>
        values.every((value) => mongoose.Types.ObjectId.isValid(value)),
      {
        message: 'Role id must be valid id',
      }
    ),
  employees: z
    .array(z.string())
    .refine(
      (values) =>
        values.every((value) => mongoose.Types.ObjectId.isValid(value)),
      {
        message: 'employees id must be valid id',
      }
    ),
  adminID: validId('adminId'),
});
