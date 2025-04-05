import { customFetch } from '@/utils';
import {
  CreateJobApplicationType,
  GetJAppliedJobIdListResponse,
  UpdateJobApplication,
} from '@/lib/types';

const createJobApplicationRequest = (formData: CreateJobApplicationType) =>
  customFetch.post('/job-applications', formData);

const updateJobApplicationStatus = ({
  applicationId,
  data,
}: UpdateJobApplication) =>
  customFetch.patch(`/job-applications/${applicationId}`, {
    status: data,
  });

const getAppliedIdListRequest: Promise<GetJAppliedJobIdListResponse> =
  customFetch.get('/job-applications/applied');

export {
  createJobApplicationRequest,
  updateJobApplicationStatus,
  getAppliedIdListRequest,
};
