import { useInfiniteQuery } from '@/hooks/useInifiniteQuery';
import { getAllNoficationsRequest } from '@/lib/api';
import { useNotificationStore } from '@/lib/store/NotificationStore';
import { Notification } from '@/lib/types';
import { useEffect } from 'react';

export const useGetAllNotifications = () => {
  const notificationStore = useNotificationStore();
  const { isLoading, data, hasMore, isError, error, loadMore } =
    useInfiniteQuery<Notification>((page) =>
      getAllNoficationsRequest(page.toString())
    );

  useEffect(() => {
    if (data) {
      notificationStore.addNotifications(data);
    }
  }, [data, notificationStore]);
  return {
    isLoading,
    data,
    hasMore,
    isError,
    error,
    loadMore,
  };
};
