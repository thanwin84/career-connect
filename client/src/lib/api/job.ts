import {
  CreateJobApiResponse,
  UpdateJobApiResponse,
  JobStatus,
  GetMyJobApplicationResponse,
  GetJobApiResponse,
  JobListResponse,
  UserJobSearchParams,
  GetUserJobsApiResponse,
} from '@/lib/types';
import { jobFormType } from '@/lib/schemas';
import { customFetch } from '@/utils';

export const createJobRequest = async (
  formData: jobFormType
): Promise<CreateJobApiResponse> => customFetch.post('/jobs', formData);

export const updateJobRequest = async (
  paramId: string,
  jobData: jobFormType
): Promise<UpdateJobApiResponse> =>
  customFetch.patch(`/jobs/${paramId}`, jobData);

export const updateManyJobApplicationStatusRequest = (
  params: string,
  data: { status: JobStatus }
) => customFetch.patch(`/job-applications/update-status?${params}`, data);

export const getMyApplicationRequest = (
  url: string
): Promise<GetMyJobApplicationResponse> => customFetch.get(url);

export const getJobRequest = (jobId: string): Promise<GetJobApiResponse> =>
  customFetch.get(`/jobs/${jobId}`);
export const getJobsRequest = async (
  searchParams: string
): Promise<JobListResponse> => customFetch.get(`/jobs/all-jobs${searchParams}`);

export const getCurrentUserJobsRequest = (
  params: UserJobSearchParams
): Promise<GetUserJobsApiResponse> =>
  customFetch.get('/jobs', { params: params });
