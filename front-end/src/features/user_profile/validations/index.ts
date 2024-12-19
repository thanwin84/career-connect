import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
export const editUserProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .min(3, 'First name should be at least 3 chars long'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(3, 'last Name should be at least 3 characters long'),
  location: z.string().min(1, 'Location is required'),
  phoneNumber: z.string().optional(),
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
export type EditUserFormData = z.infer<typeof editUserProfileSchema>;

export const educationFormSchema = z
  .object({
    _id: z.string().optional(),
    school: z.string().min(1, 'School is required'),
    degree: z.string().min(1, 'Degree is required'),
    department: z.string().min(1, 'Department is required'),
    startMonth: z.string().min(1, 'Start month is required'),
    startYear: z.string().min(1, 'start year is required'),
    endMonth: z.string().optional(),
    endYear: z.string().optional(),
    currentlyStudying: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (!data.currentlyStudying) {
      if (!data.endMonth) {
        ctx.addIssue({
          code: 'custom',
          path: ['endMonth'],
          message: 'End month is required',
        });
      }
      if (!data.endYear) {
        ctx.addIssue({
          code: 'custom',
          path: ['endYear'],
          message: 'End Year is required',
        });
      }
    }
  });

export type EducationCreationForm = z.infer<typeof educationFormSchema>;
