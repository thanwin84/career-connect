import { BaseApiReponse, Pagination, User } from '.';
import { constants } from '../../config/appConfig';
import { JobStatus, Job } from './job';

export type Public_User = Pick<
  User,
  '_id' | 'firstName' | 'lastName' | 'avatar'
>;
export type StatusObject = {
  _id: string;
  status: JobStatus;
  updatedBy: Public_User;
  createdAt: string;
  updatedAt: string;
};
export type JobApplication = {
  _id: string;
  status: JobStatus;
  statusHistory: StatusObject[];
  recruiter: Public_User;
  job: Job;
  company: string;
  candidate: Public_User;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateJobApplicationType = {
  id?: string;
  jobId: string;
};
export type UpdateJobApplication = {
  applicationId: string;
  data: {
    status: JobStatus;
  };
};

export type GetMyJobApplicationsQueryParamsType = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: 'latest' | 'old';
  status?: JobStatus;
  candidateId?: string;
  recruiterId?: string;
};
export type GetAllJobApplicationsQueryParamsType = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: 'latest' | 'old';
  status?: JobStatus;
  candidateId?: string;
  recruiterId?: string;
  candidateName?: string;
};
export type BulkJobApplicationStatusUpdateType = {
  data: {
    status: JobStatus;
  };
  params: string;
};

export type GetJAppliedJobIdListResponse = BaseApiReponse<{
  ids: string[];
}>;

export type GetJobApplicationList = BaseApiReponse<{
  jobApplications: JobApplication[];
  pagination: Pagination;
}>;

export type GetMyJobApplicationResponse = BaseApiReponse<{
  jobApplications: JobApplication[];
  pagination: Pagination;
}>;

export type JobApplicationStats = {
  defaultStats: {
    [constants.JOB_STATUS.APPLIED]: number;
    [constants.JOB_STATUS.SHORTLISTED]: number;
    [constants.JOB_STATUS.INTERVIEW]: number;
    [constants.JOB_STATUS.DECLINED]: number;
    [constants.JOB_STATUS.HIRED]: number;
  };
  monthlyApplications: { date: string; count: number }[];
};
export type JobApplicationStatsResponse = BaseApiReponse<JobApplicationStats>;
