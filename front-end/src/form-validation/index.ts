import { z } from "zod";
import {
  experianceLevel,
  JOB_STATUS,
  JOB_TYPE,
  UserRoles,
} from "../constants/constant";

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
const createUserFormSchema = personalInfoSchema
  .merge(describeYourselfSchema)
  .merge(addProfilePhotoSchema);

export type CreateUserForm = z.infer<typeof createUserFormSchema>;

// add job
export const createJobFormSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  jobLocation: z.string().min(1, "Job Location is required"),
  jobStatus: z
    .enum(Object.values(JOB_STATUS) as [string, ...string[]], {
      message: "Please select an option",
      invalid_type_error: "Please select an option",
    })
    .optional(),
  jobType: z.enum(Object.values(JOB_TYPE) as [string, ...string[]], {
    message: "Please select an option",
    invalid_type_error: "Invalid Job Type",
  }),
  experianceLevel: z.enum(
    Object.values(experianceLevel) as [string, ...string[]],
    {
      message: "Please select an option",
    }
  ),
  country: z.string().min(1, "Country is required"),
  salary: z
    .object({
      min: z.coerce
        .number()
        .min(1, "Min salary should be at least 0")
        .nonnegative("Salary input must be positive number"),
      max: z.coerce
        .number()
        .min(1, "max salary should be at least 0")
        .nonnegative("Salary input must be positive number"),
    })
    .optional(),
  openRoles: z.coerce
    .number()
    .nonnegative("Open role number must be positive")
    .min(1, "Open roles should be at least 1"),
  applicationDeadline: z
    .string()
    .refine(
      (value) => !isNaN(new Date(value).getTime()),
      "Application deadline must be a valid date"
    ),
});

export type JobCreationForm = z.infer<typeof createJobFormSchema>;

export const educationFormSchema = z
  .object({
    _id: z.string().optional(),
    school: z.string().min(1, "School is required"),
    degree: z.string().min(1, "Degree is required"),
    department: z.string().min(1, "Department is required"),
    startMonth: z.string().min(1, "Start month is required"),
    startYear: z.string().min(1, "start year is required"),
    endMonth: z.string().optional(),
    endYear: z.string().optional(),
    currentlyStudying: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (!data.currentlyStudying) {
      if (!data.endMonth) {
        ctx.addIssue({
          code: "custom",
          path: ["endMonth"],
          message: "End month is required",
        });
      }
      if (!data.endYear) {
        ctx.addIssue({
          code: "custom",
          path: ["endYear"],
          message: "End Year is required",
        });
      }
    }
  });

export type EducationCreationForm = z.infer<typeof educationFormSchema>;
