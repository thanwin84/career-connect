import { customFetch } from '@/utils';
import { ApplicationStatsResponse, UserListResponse } from '@/lib/types';

export const getApplicationStatsRequest =
  (): Promise<ApplicationStatsResponse> =>
    customFetch.get('/users/admin/app-stats');

export const getUserListRequest = (params: string): Promise<UserListResponse> =>
  customFetch.get(`/users/get-users-list?limit=5&${params}`, {
    headers: {
      'Cache-Control': 'no-cache, no-store',
    },
  });

export const toggleAccessStatusRequest = (userId: string) =>
  customFetch.patch(`/users/toggle-access-status/${userId}`);
