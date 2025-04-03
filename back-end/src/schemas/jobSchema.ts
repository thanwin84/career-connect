import { z } from 'zod';
import { DateMixin, IDSchema, locationZodSchema } from './mixin';
import { experianceLevel, JOB_TYPE } from '../constants';
import { validId } from '../utils';

export const jobSchema = z.object({
  ...IDSchema.shape,
  ...DateMixin.shape,
  companyId: z.string({ required_error: 'Company id is required' }),
  position: z.string({ required_error: 'Position is required.' }),
  jobType: z.enum(
    Object.values(JOB_TYPE) as [
      (typeof JOB_TYPE)[keyof typeof JOB_TYPE],
      ...(typeof JOB_TYPE)[keyof typeof JOB_TYPE][]
    ],
    {
      required_error: 'Job Type is required',
      invalid_type_error: 'Invalid status',
    }
  ),
  jobLocation: locationZodSchema,
  salary: z
    .object({
      min: z.number().min(0, 'Salary minimum cannot be less than 0').default(0),
      max: z.number().min(0, 'Salary maximum cannot be less than 0').default(0),
    })
    .optional(),
  experianceLevel: z.enum(
    Object.values(experianceLevel) as [
      (typeof experianceLevel)[keyof typeof experianceLevel],
      ...(typeof experianceLevel)[keyof typeof experianceLevel][]
    ],
    {
      required_error: 'experianceLevel is required',
      invalid_type_error: 'Invalid experiance level status',
    }
  ),
  openRoles: z
    .number()
    .int()
    .min(0, 'Open roles number cannot be negative number')
    .optional(),
  createdBy: z.string({ required_error: 'Created by is required' }),
  numberOfApplicants: z.number().optional(),
  applicationDeadline: z
    .string({
      required_error: 'Application deadline is required',
    })
    .transform((value) => new Date(value))
    .refine((value) => !isNaN(value.getTime()), {
      message: 'Please enter a valid date',
    }),
});

export type JobType = z.infer<typeof jobSchema>;
