import {
  BaseApiReponse,
  Job,
  JobApplication,
  JobStatus,
  Pagination,
  User,
} from '../../types';

export type Candidate = JobApplication & {
  user: User;
  job: Job;
};

export type GetJobApplicationList = BaseApiReponse<{
  jobApplications: Candidate[];
  pagination: Pagination;
}>;
export type CreateJobApiResponse = BaseApiReponse<{}>;
export type UpdateJobApiResponse = BaseApiReponse<{}>;
export type UpdateJobApplicationStatusData = {
  status: JobStatus;
};
