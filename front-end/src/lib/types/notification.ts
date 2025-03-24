import { BaseApiReponse, Pagination } from './common';

export type Notification = {
  _id: string;
  userId: string;
  type: 'job_apply' | 'job_update';
  data: any;
  status: 'read' | 'unread';
  createdAt: string;
  updatedAt: string;
};

export type GetAllNotificationsApiResponse = BaseApiReponse<{
  notifications: Notification[];
  pagination: Pagination;
}>;

export type GetUnreadNotificationCountResponse = BaseApiReponse<{
  unreadCount: number;
}>;
