import { z } from 'zod';
import { DateMixin, IDSchema, locationZodSchema } from './mixin';

export const companySchema = z.object({
  ...IDSchema.shape,
  ...DateMixin.shape,
  location: locationZodSchema,
  name: z
    .string({ required_error: 'Company is required' })
    .min(3, 'Company name must be at least 3 characters long'),
  description: z.string().optional(),
});

export type Company = z.infer<typeof companySchema>;
