import mongoose from 'mongoose';
import { z } from 'zod';

export const validId = (IdName: string) => {
  return z
    .string({ required_error: `${IdName} is required` })
    .min(1, `${IdName} is required`)
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: `Invalid ${IdName} Id`,
    });
};
