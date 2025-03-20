import { useQuery } from '../../../hooks';
import { useNotificationStore } from '../../../lib/store/NotificationStore';
import { getUnreadNotificationCount } from '../../../lib/api/notification';

export const useGetUnreadCount = () => {
  const notificationStore = useNotificationStore();
  const res = useQuery(getUnreadNotificationCount, {
    onSuccess: (data) => {
      notificationStore.addUnreadCount(data.data.unreadCount);
    },
  });

  return {
    ...res,
  };
};
