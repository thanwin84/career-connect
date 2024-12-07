import { z } from "zod";
import { UserRoles } from "../constants/constant";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const editUserProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .min(3, "First name should be at least 3 chars long"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, "last Name should be at least 3 characters long"),
  location: z.string().min(1, "Location is required"),
  phoneNumber: z.string().optional(),
  avatar: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0]?.size <= 500000,
      {
        message: "Avatar size cannot be larger than 0.5MB",
      }
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0]?.type && ACCEPTED_IMAGE_TYPES.includes(files[0].type)),
      {
        message: "Please upload a valid image file (JPEG, PNG, or WebP)",
      }
    ),
});
export type EditUserFormData = z.infer<typeof editUserProfileSchema>;

// create account

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .min(3, "First name should be at least 3 chars long"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name is required")
    .min(3, "last Name should be at least 3 characters long"),
  location: z.string().min(1, "Location is required"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password has to be at least 8 chars long"),
});
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export const describeYourselfSchema = z.object({
  role: z.enum(Object.values(UserRoles) as [string, ...string[]], {
    required_error: "Please select an option",
    invalid_type_error: "Invalid status",
  }),
});
export type DescribeYourself = z.infer<typeof describeYourselfSchema>;
export const addProfilePhotoSchema = z.object({
  avatar: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0]?.size <= 500000,
      {
        message: "Avatar size cannot be larger than 0.5MB",
      }
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        (files[0]?.type && ACCEPTED_IMAGE_TYPES.includes(files[0].type)),
      {
        message: "Please upload a valid image file (JPEG, PNG, or WebP)",
      }
    ),
});
export type AddProfileType = z.infer<typeof addProfilePhotoSchema>;
const createUserSchema = personalInfoSchema
  .merge(describeYourselfSchema)
  .merge(addProfilePhotoSchema);

export type CreateUser = z.infer<typeof createUserSchema>;
