import { customFetch } from '@/utils';
import { GetUnreadNotificationCountResponse, Pagination } from '@/lib/types';

// TODO: fix reponse type
export const getAllNoficationsRequest = <T>(
  page: string
): Promise<{ data: T[]; pagination: Pagination }> =>
  customFetch.get(`/notifications/?page=${page}`).then((response) => ({
    pagination: response.data.pagination,
    data: response.data.notifications as T[],
  }));
export const markAsReadRequest = () =>
  customFetch.patch('/notifications/mark-as-read');

export const getUnreadNotificationCount =
  (): Promise<GetUnreadNotificationCountResponse> =>
    customFetch.get('/notifications/unread-count');
