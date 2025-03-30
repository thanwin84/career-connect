import { z } from 'zod';
import { DateMixin, IDSchema, locationZodSchema } from './mixin';
import mongoose from 'mongoose';

export const educationSchema = z
  .object({
    ...IDSchema.shape,
    ...DateMixin.shape,
    school: z.string({ required_error: 'School is required' }),
    department: z.string({ required_error: 'Department is required' }),
    degree: z.string().min(1, 'Degree is required'),
    startMonth: z.string({ required_error: 'Start month is required' }),
    startYear: z.string({ required_error: 'Start year is required' }),
    endMonth: z.string().optional(),
    endYear: z.string().optional(),
    currentlyStudying: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.currentlyStudying) {
      if (!data.endMonth) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End month is required',
          path: ['endMonth'],
        });
      }
      if (!data.endYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End Year is required',
          path: ['endYear'],
        });
      }
    }
  });
const imageSchema = z.object({
  url: z.string().optional(),
  publicId: z.string().optional(),
});

export const userSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Email must be valid email'),
  password: z.string({ required_error: 'password is required' }),
  lastName: z.string({ required_error: 'Last name is required' }),
  location: locationZodSchema,
  avatar: imageSchema.optional(),
  coverPhoto: imageSchema.optional(),
  educationRecords: z.array(educationSchema).optional(),
  accessStatus: z.boolean().optional(),
  twoStepAuthentication: z.boolean().optional(),
  phoneNumber: z.string().optional(),
  isDeleted: z.boolean().optional(),
  isEmailVerified: z.boolean().optional(),
  emailVerifyToken: z.string().optional(),
  emailVerifyTokenExpiry: z.string().optional(),
  forgotPasswordToken: z.string().optional(),
  forgotPasswordTokenExpiry: z.string().optional(),
  worksAt: z
    .string()
    .optional()
    .refine((value) => !value || mongoose.Types.ObjectId.isValid(value), {
      message: 'Invalid worksAt Id',
    }),
});
export type EducationType = z.infer<typeof educationSchema>;
export type UserType = z.infer<typeof userSchema>;
