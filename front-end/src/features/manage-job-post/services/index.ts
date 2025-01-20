import { FormData, JobStatus } from '../../../types/index';
import { customFetch } from '../../../utils';
import {
  CreateJobApiResponse,
  GetJobApplicationList,
  UpdateJobApiResponse,
  UpdateJobApplicationStatusData,
} from '../types';

export const createJobRequest = async (
  formData: FormData
): Promise<CreateJobApiResponse> => await customFetch.post('/jobs', formData);
export const updateJobRequest = async (
  paramId: string,
  jobData: FormData
): Promise<UpdateJobApiResponse> =>
  await customFetch.patch(`/jobs/${paramId}`, jobData);

export const getJobApplicationListRequest = (
  params: string
): Promise<GetJobApplicationList> =>
  customFetch
    .get(`/job-applications?limit=4&${params}`)
    .then((res) => res.data);

export const updateJobApplicationStatus = (
  applicationId: string,
  data: UpdateJobApplicationStatusData
) =>
  customFetch.patch(`/job-applications/${applicationId}`, {
    status: data,
  });

export const updateManyJobApplicationStatusRequest = (
  params: string,
  data: { status: JobStatus }
) => customFetch.patch(`/job-applications/update-status?${params}`, data);
