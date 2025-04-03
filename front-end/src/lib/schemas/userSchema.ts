import { z } from 'zod';
import { IDSchema, DateMixin, locationZodSchema } from './mixin';
import { constants } from '../../config/appConfig';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const addProfilePhotoSchema = z.object({
  avatar: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0]?.size <= 500000,
      {
        message: 'Avatar size cannot be larger than 0.5MB',
      }
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0]?.type && ACCEPTED_IMAGE_TYPES.includes(files[0].type)),
      {
        message: 'Please upload a valid image file (JPEG, PNG, or WebP)',
      }
    ),
});

export const educationSchema = z
  .object({
    ...IDSchema.shape,
    ...DateMixin.shape,
    school: z.string().min(1, 'School is required.'),
    department: z.string().min(1, 'Department is required.'),
    degree: z.string().min(1, 'Degree is required'),
    startMonth: z.string().min(1, 'Start month is required.'),
    startYear: z.string().min(1, 'Start year is required.'),
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

const roleSchema = z.enum(
  Object.values(constants.UserRoles) as [
    (typeof constants.UserRoles)[keyof typeof constants.UserRoles],
    ...(typeof constants.UserRoles)[keyof typeof constants.UserRoles][]
  ]
);

export const userFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email({ message: 'Email must be valid' }),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 chars long'),
  lastName: z.string().min(1, 'Last name is required'),
  location: locationZodSchema,
  educationRecords: z.array(educationSchema).optional(),
  accessStatus: z.boolean().optional(),
  twoStepAuthentication: z.boolean().optional(),
  phoneNumber: z.string().optional(),
  isDeleted: z.union([z.date(), z.literal(null)]).optional(),
  isEmailVerified: z.boolean().optional(),
  role: roleSchema,
  ...DateMixin.shape,
  ...addProfilePhotoSchema.shape,
});

export const changePasswordSchema = z.object({
  oldPassword: userFormSchema.shape.password,
  newPassword: userFormSchema.shape.password,
});

export type ChangePasswordFormType = z.infer<typeof changePasswordSchema>;
export type EducationFormType = z.infer<typeof educationSchema>;
export type UserFormType = z.infer<typeof userFormSchema>;
