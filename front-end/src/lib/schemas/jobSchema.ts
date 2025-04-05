import { z } from 'zod';
import { DateMixin, IDSchema, locationZodSchema } from './mixin';
import { constants } from '../../config/appConfig';

export const jobFormSchema = z.object({
  ...IDSchema.shape,
  ...DateMixin.shape,
  companyId: z.string().min(1, 'Company id is required').optional(),
  position: z.string().min(1, 'Position is required'),
  jobType: z.enum(
    Object.values(constants.JOB_TYPE) as [
      (typeof constants.JOB_TYPE)[keyof typeof constants.JOB_TYPE],
      ...(typeof constants.JOB_TYPE)[keyof typeof constants.JOB_TYPE][]
    ],
    {
      message: 'Job Type is required',
      invalid_type_error: 'Invalid status',
    }
  ),
  jobLocation: locationZodSchema,
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
  experianceLevel: z.enum(
    Object.values(constants.experianceLevel) as [
      (typeof constants.experianceLevel)[keyof typeof constants.experianceLevel],
      ...(typeof constants.experianceLevel)[keyof typeof constants.experianceLevel][]
    ],
    {
      message: 'experianceLevel is required',
      invalid_type_error: 'Invalid experiance level status',
    }
  ),
  openRoles: z.coerce.number().min(1, 'Open roles must be at least 1'),
  numberOfApplicants: z.number().optional().default(0),
  applicationDeadline: z
    .string()
    .min(1, 'Application deadline is required')
    .date('Please enter valid date.'),
});

export type jobFormType = z.infer<typeof jobFormSchema>;
