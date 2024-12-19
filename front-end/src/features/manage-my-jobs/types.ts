import { BaseApiReponse, MyJobApplication, Pagination } from '../../types';

export type GetMyJobApplication = {
  jobApplications: MyJobApplication[];
  pagination: Pagination;
};

export type GetMyJobApplicationResponse = BaseApiReponse<GetMyJobApplication>;
