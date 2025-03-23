import { z } from 'zod';

const IDSchema = z.object({
  _id: z.string().optional(),
});

const DateMixin = z.object({
  createdAt: z.union([z.string(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.date()]).optional(),
});

export { IDSchema, DateMixin };
