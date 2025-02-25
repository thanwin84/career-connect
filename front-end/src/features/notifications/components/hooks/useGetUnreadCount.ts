import { useQuery } from '../../../../hooks';
import { useNotificationStore } from '../../../../store/NotificationStore';
import { getUnreadNotificationCount } from '../service';

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
