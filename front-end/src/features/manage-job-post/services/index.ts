import { FormData } from '../../../types/index';
import { customFetch } from '../../../utils';
import { CreateJobApiResponse, UpdateJobApiResponse } from '../types';

export const createJobRequest = async (
  formData: FormData
): Promise<CreateJobApiResponse> => await customFetch.post('/jobs', formData);
export const updateJobRequest = async (
  paramId: string,
  jobData: FormData
): Promise<UpdateJobApiResponse> =>
  await customFetch.patch(`/jobs/${paramId}`, jobData);
