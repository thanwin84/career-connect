import { customFetch, extractDataFromResponse } from '../../utils';
import { ApplicationStatsResponse, UserListResponse } from '../types/admin';

export const getApplicationStatsRequest =
  (): Promise<ApplicationStatsResponse> =>
    customFetch.get('/users/admin/app-stats').then(extractDataFromResponse);

export const getUserListRequest = (params: string): Promise<UserListResponse> =>
  customFetch
    .get(`/users/get-users-list?limit=5&${params}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store',
      },
    })
    .then(extractDataFromResponse);

export const toggleAccessStatusRequest = (userId: string) =>
  customFetch.patch(`/users/toggle-access-status/${userId}`);
