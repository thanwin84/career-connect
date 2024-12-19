import { BaseApiReponse, Pagination, User } from '../../types';

export type ApplicationStats = {
  users: number;
  jobs: number;
};

export type ApplicationStatsResponse = BaseApiReponse<ApplicationStats>;
export type UserList = {
  users: User[];
  pagination: Pagination;
};

export type UserListResponse = BaseApiReponse<UserList>;
