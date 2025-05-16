import useQuery from '@/hooks/useQuery';
import { getUnreadNotificationCount } from '@/lib/api';
import { useNotificationStore } from '@/lib/store';

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
