import { z } from 'zod';
import { DateMixin, IDSchema } from './mixin';
import { validId } from '../utils';
import { JOB_STATUS } from '../constants';

const statusSchema = {
  status: z.enum(
    Object.values(JOB_STATUS) as [
      (typeof JOB_STATUS)[keyof typeof JOB_STATUS],
      ...(typeof JOB_STATUS)[keyof typeof JOB_STATUS][]
    ],
    {
      required_error: 'Job status is required',
      invalid_type_error: 'Invalid status',
    }
  ),
};
const jobStatusSchema = z.object({
  ...IDSchema.shape,
  ...DateMixin.shape,
  updatedBy: validId('updatedBy').optional(),
  status: statusSchema.status,
});

export type JobStatusType = z.infer<typeof jobStatusSchema>;

export const jobApplicationSchema = z.object({
  ...IDSchema.shape,
  ...DateMixin.shape,
  candidateId: validId('candidateId'),
  jobId: validId('jobId'),
  status: statusSchema.status,
  statusHistory: z.array(jobStatusSchema).optional(),
  interviewDate: z.string().optional(),
});

export type JobApplicationType = z.infer<typeof jobApplicationSchema>;
