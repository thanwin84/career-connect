import { BaseApiReponse, Location, Pagination, TimeStamps } from '.';
import { constants } from '../../config/appConfig';

export type JobStatus =
  (typeof constants.JOB_STATUS)[keyof typeof constants.JOB_STATUS];
export type JobType =
  (typeof constants.JOB_TYPE)[keyof typeof constants.JOB_TYPE];
export type JobSortBy =
  (typeof constants.JOB_SORT_BY)[keyof typeof constants.JOB_SORT_BY];
export type ExperianceLevel =
  (typeof constants.experianceLevel)[keyof typeof constants.experianceLevel];

export type PublicCompany = {
  _id: string;
  name: string;
  description?: string;
  location: Location;
} & TimeStamps;
export type Job = {
  isApplied?: boolean;
  _id: string;
  position: string;
  jobType: JobType;
  jobLocation: Location;
  salary: {
    min: number;
    max: number;
  };
  experianceLevel: ExperianceLevel;
  openRoles: number;
  createdBy: {
    _id: string;
    firstName: string;
    email: string;
    lastName: string;
    avatar: {
      url: string;
      publicId: string;
    };
  };
  applicationDeadline: string;
  numberOfApplicants: number;
  company: PublicCompany;
} & TimeStamps;

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
