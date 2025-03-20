import { NotificationTypes } from '../constants/constant';
import { BaseApiReponse, Pagination } from './common';

export type Notification = {
  _id: string;
  userId: string;
  type: keyof typeof NotificationTypes;
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
