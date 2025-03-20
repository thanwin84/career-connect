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
