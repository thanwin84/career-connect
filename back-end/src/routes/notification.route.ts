import { Router } from 'express';
import {
  getAllNotification,
  getUnreadNotificationsCount,
  markAsRead,
} from '../controllers/notification.controllet';
import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.route('/').get(authenticateUser, getAllNotification);

router.route('/mark-as-read').patch(authenticateUser, markAsRead);

router
  .route('/unread-count')
  .get(authenticateUser, getUnreadNotificationsCount);
export default router;
