import {
  JobType,
  JobSortBy,
  ExperianceLevel,
  BaseApiReponse,
  Job,
  Pagination,
} from '../../types';

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

export type JobList = {
  jobs: Job[];
  pagination: Pagination;
};

export type JobListResponse = BaseApiReponse<JobList>;
