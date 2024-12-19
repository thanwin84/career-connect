import { customFetch, extractDataFromResponse } from '../../../utils';
import { ApplicationStatsResponse, UserListResponse } from '../types';

export const getApplicationStatsRequest =
  (): Promise<ApplicationStatsResponse> =>
    customFetch.get('/users/admin/app-stats').then(extractDataFromResponse);

export const getUserListRequest = (params: string): Promise<UserListResponse> =>
  customFetch
    .get(`/users/get-users-list?${params}`)
    .then(extractDataFromResponse);

export const toggleAccessStatusRequest = (userId: string) =>
  customFetch.patch(`/users/toggle-access-status/${userId}`);
