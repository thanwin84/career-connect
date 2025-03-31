import { JOB_STATUS } from '../constants/constant';
import { BaseApiReponse, Pagination } from './common';
import { JobStatus, Job } from './job';

type Public_User = {
  _id: string;
  firstName: string;
  email: string;
  lastName: string;
  avatar?: {
    url: string;
    publicId: string;
  };
};
type JobApplication = {
  _id: string;
  status: JobStatus;
  statusHistory: Public_User[];
  recruiter: Public_User;
  job: Job;
  company: string;
  candidate: Public_User;
  notes?: string;
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
    [JOB_STATUS.APPLIED]: number;
    [JOB_STATUS.SHORTLISTED]: number;
    [JOB_STATUS.INTERVIEW]: number;
    [JOB_STATUS.DECLINED]: number;
    [JOB_STATUS.HIRED]: number;
  };
  monthlyApplications: { date: string; count: number }[];
};
export type JobApplicationStatsResponse = BaseApiReponse<JobApplicationStats>;
