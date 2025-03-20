import { customFetch } from '../../utils';
import { Pagination } from '../types/common';
import { GetUnreadNotificationCountResponse } from '../types/notification';

export const getAllNoficationsRequest = <T>(
  page: String
): Promise<{ data: T[]; pagination: Pagination }> =>
  customFetch.get(`/notifications/?page=${page}`).then((response) => ({
    pagination: response.data.data.pagination,
    data: response.data.data.notifications as T[],
  }));

export const markAsReadRequest = () =>
  customFetch.patch('/notifications/mark-as-read');

export const getUnreadNotificationCount =
  (): Promise<GetUnreadNotificationCountResponse> =>
    customFetch.get('/notifications/unread-count').then((res) => res.data);
