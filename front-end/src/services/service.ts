import { JobListResponse } from '../features/find_jobs/types';
import {
  CountryList,
  GetUserJobsApiResponse,
  UserJobSearchParams,
  FormData,
  CurrentUserResponse,
  GetJobApiResponse,
  GetJAppliedJobIdListResponse,
} from '../types';
import { customFetch } from '../utils';

// user
export const getUserInformationRequest =
  async (): Promise<CurrentUserResponse> => {
    try {
      const response = await customFetch.get('/users/current-user');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const addPhoneNumberRequest = async (formData: FormData) => {
  try {
    await customFetch.patch('/users/add-phone-number', formData);
  } catch (error) {
    throw error;
  }
};

// jobs
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
export const getCountryListRequest = (): Promise<CountryList> =>
  customFetch.get('/records/countries').then((res) => res.data.data);
export const getCurrentUserJobsRequest = (
  params: UserJobSearchParams
): Promise<GetUserJobsApiResponse> =>
  customFetch.get('/jobs', { params: params }).then((res) => res.data);

// job applications

export const getAppliedIdListRequest: Promise<GetJAppliedJobIdListResponse> =
  customFetch.get('/job-applications/applied').then((res) => res.data);
