import { JOB_STATUS } from '../constants/constant';
import { BaseApiReponse, Pagination } from './common';
import { JobStatus, Job } from './job';
import { User } from './user';

export type JobApplication = {
  _id: string;
  candidateId: string;
  recruiterId: string;
  jobId: string;
  interviewDate?: string;
  createdAt: string;
  updatedAt: string;
  status?: JobStatus;
  statusHistory: {
    status: JobStatus;
    updatedBy: string;
    updatedAt?: string;
  }[];
  notes?: string;
};

export type MyJobApplication = {
  _id: string;
  status: JobStatus;
  statusHistory: {
    status: JobStatus;
    updatedBy: string;
    updatedAt: string;
  }[];
  job: Job;
  recruiter: User;
};

export type GetJAppliedJobIdListResponse = BaseApiReponse<{
  ids: string[];
}>;

export type Candidate = JobApplication & {
  user: User;
  job: Job;
};

export type GetJobApplicationList = BaseApiReponse<{
  jobApplications: Candidate[];
  pagination: Pagination;
}>;

export type GetMyJobApplicationResponse = BaseApiReponse<{
  jobApplications: MyJobApplication[];
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
