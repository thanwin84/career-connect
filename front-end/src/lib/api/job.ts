import { customFetch } from '../../utils';
import {
  CreateJobApiResponse,
  GetJobApiResponse,
  GetUserJobsApiResponse,
  JobListResponse,
  JobStatus,
  UpdateJobApiResponse,
  UpdateJobApplicationStatusData,
  UserJobSearchParams,
} from '../types/job';
import { FormData } from '../types/common';

import {
  GetJobApplicationList,
  GetMyJobApplicationResponse,
} from '../types/jobApplication';

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

export const getMyApplicationRequest = (
  url: string
): Promise<GetMyJobApplicationResponse> =>
  customFetch.get(url).then((res) => res.data);

export const getJobRequest = (jobId: string): Promise<GetJobApiResponse> =>
  customFetch.get(`/jobs/${jobId}`).then((res) => res.data);
export const getJobsRequest = async (
  searchParams: string
): Promise<JobListResponse> => {
  try {
    const response = await customFetch.get(`/jobs/all-jobs${searchParams}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCurrentUserJobsRequest = (
  params: UserJobSearchParams
): Promise<GetUserJobsApiResponse> =>
  customFetch.get('/jobs', { params: params }).then((res) => res.data);
