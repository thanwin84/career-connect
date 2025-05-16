import { z } from 'zod';

const IDSchema = z.object({
  _id: z.string().optional(),
});

const DateMixin = z.object({
  createdAt: z.union([z.string(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.date()]).optional(),
});

const locationZodSchema = z.object({
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
  detailsAddress: z.string().optional(),
});

export { IDSchema, DateMixin, locationZodSchema };
