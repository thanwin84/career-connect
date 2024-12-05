import {
  experianceLevel,
  JOB_SORT_BY,
  JOB_STATUS,
  JOB_TYPE,
  UserRoles,
} from "../utils/constants";

export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
export type JobType = (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
export type JobSortBy = (typeof JOB_SORT_BY)[keyof typeof JOB_SORT_BY];
export type ExperianceLevel =
  (typeof experianceLevel)[keyof typeof experianceLevel];
export type Sort = (typeof JOB_SORT_BY)[keyof typeof JOB_SORT_BY];
export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export type Stats = {
  interview: number;
  pending: number;
  declined: number;
};

export type Pagination = {
  totalPages: number;
  currentPage: number;
  totalItems: number;
};
