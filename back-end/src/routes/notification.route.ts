import { Router } from 'express';
import {
  getAllNotification,
  getUnreadNotificationsCount,
  markAsRead,
} from '../controllers/notification.controllet';
import { authenticateUser } from '../middleware/auth.middleware';

const notificationRouter = Router();

notificationRouter.route('/').get(authenticateUser, getAllNotification);

notificationRouter.route('/mark-as-read').patch(authenticateUser, markAsRead);

notificationRouter
  .route('/unread-count')
  .get(authenticateUser, getUnreadNotificationsCount);
export default notificationRouter;
