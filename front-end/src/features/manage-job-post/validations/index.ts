import { z } from 'zod';
import {
  JOB_STATUS,
  JOB_TYPE,
  experianceLevel,
} from '../../../app/constants/constant';

export const createJobFormSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  jobLocation: z.string().min(1, 'Job Location is required'),
  jobStatus: z
    .enum(Object.values(JOB_STATUS) as [string, ...string[]], {
      message: 'Please select an option',
      invalid_type_error: 'Please select an option',
    })
    .optional(),
  jobType: z.enum(Object.values(JOB_TYPE) as [string, ...string[]], {
    message: 'Please select an option',
    invalid_type_error: 'Invalid Job Type',
  }),
  experianceLevel: z.enum(
    Object.values(experianceLevel) as [string, ...string[]],
    {
      message: 'Please select an option',
    }
  ),
  country: z.string().min(1, 'Country is required'),
  salary: z
    .object({
      min: z.coerce
        .number()
        .min(1, 'Min salary should be at least 0')
        .nonnegative('Salary input must be positive number'),
      max: z.coerce
        .number()
        .min(1, 'max salary should be at least 0')
        .nonnegative('Salary input must be positive number'),
    })
    .optional(),
  openRoles: z.coerce
    .number()
    .nonnegative('Open role number must be positive')
    .min(1, 'Open roles should be at least 1'),
  applicationDeadline: z
    .string()
    .refine(
      (value) => !isNaN(new Date(value).getTime()),
      'Application deadline must be a valid date'
    ),
});

export type CreateJobFormType = z.infer<typeof createJobFormSchema>;
