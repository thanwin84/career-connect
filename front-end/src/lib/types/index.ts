import { constants } from '../../config/appConfig';

export type ID = {
  _id: string;
};
export type TimeStamps = {
  createdAt: string;
  updatedAt: string;
};
export type Location = {
  city: string;
  country: string;
};
export type Theme = 'light' | 'dark';

export type BaseApiReponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
};

export type Pagination = {
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

export type City = {
  _id: string;
  name: string;
};
export type Country = {
  _id: string;
  name: string;
  cities: City[];
};
export type CountryList = Country[];

export type JobStatus =
  (typeof constants.JOB_STATUS)[keyof typeof constants.JOB_STATUS];
export type JobType =
  (typeof constants.JOB_TYPE)[keyof typeof constants.JOB_TYPE];
export type JobSortBy =
  (typeof constants.JOB_SORT_BY)[keyof typeof constants.JOB_SORT_BY];
export type ExperianceLevel =
  (typeof constants.experianceLevel)[keyof typeof constants.experianceLevel];

export * from './admin';
export * from './auth';
export * from './job';
export * from './jobApplication';
export * from './user';
export * from './notification';
