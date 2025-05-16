import { customFetch } from '@/utils';
import {
  CreateJobApplicationType,
  GetJAppliedJobIdListResponse,
  GetJobApplicationList,
  UpdateJobApplication,
} from '@/lib/types';

const createJobApplicationRequest = (formData: CreateJobApplicationType) =>
  customFetch.post('/job-applications', formData);

const updateJobApplicationStatus = ({
  applicationId,
  data,
}: UpdateJobApplication) =>
  customFetch.patch(`/job-applications/${applicationId}`, data);

const getAppliedIdListRequest: Promise<GetJAppliedJobIdListResponse> =
  customFetch.get('/job-applications/applied');

export const getJobApplicationListRequest = (
  params: string
): Promise<GetJobApplicationList> =>
  customFetch(`/job-applications?limit=4&${params}`);

export {
  createJobApplicationRequest,
  updateJobApplicationStatus,
  getAppliedIdListRequest,
};
