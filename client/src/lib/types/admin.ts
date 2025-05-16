import { BaseApiReponse, Pagination } from '.';
import { User } from './user';

export type ApplicationStatsResponse = BaseApiReponse<{
  users: number;
  jobs: number;
}>;
export type UserListResponse = BaseApiReponse<{
  users: User[];
  pagination: Pagination;
}>;
