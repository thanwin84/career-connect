import {
  JOB_STATUS,
  JOB_TYPE,
  JOB_SORT_BY,
  experianceLevel,
} from '../constants/constant';
import { BaseApiReponse, Pagination } from './common';

export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
export type JobType = (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
export type JobSortBy = (typeof JOB_SORT_BY)[keyof typeof JOB_SORT_BY];
export type ExperianceLevel =
  (typeof experianceLevel)[keyof typeof experianceLevel];

export type Job = {
  isApplied?: boolean;
  _id: string;
  company: string;
  position: string;
  jobType: JobType;
  jobLocation: string;
  country: string;
  salary: {
    min: number;
    max: number;
  };
  experianceLevel: ExperianceLevel;
  openRoles: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  applicationDeadline: Date;
  numberOfApplicants: number;
};

export type Jobs = Job[];

export type GetUserJobsApiResponse = BaseApiReponse<{
  jobs: Job[];
  pagination: Pagination;
}>;

export type GetJobApiResponse = BaseApiReponse<{
  job: Job;
}>;

export type UserJobSearchParams = {
  limit?: string;
  page?: string;
  search?: string;
  jobStatus?: JobStatus | 'all';
  jobType?: JobType | 'all';
  sort?: JobSortBy;
};

export type PublicJobsSearchParams = {
  page: string;
  limit: string;
  jobType: JobType[];
  sort: JobSortBy | null;
  location: string | null;
  search: string | null;
  minSalary: string;
  maxSalary: string;
  experianceLevel: ExperianceLevel[];
};

export type CreateJobApiResponse = BaseApiReponse<{}>;
export type UpdateJobApiResponse = BaseApiReponse<{}>;
export type UpdateJobApplicationStatusData = {
  status: JobStatus;
};

export type JobListResponse = BaseApiReponse<{
  jobs: Job[];
  pagination: Pagination;
}>;
