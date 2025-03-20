import { useEffect } from 'react';
import { useInfiniteQuery } from '../../../hooks/useInifiniteQuery';
import { getAllNoficationsRequest } from '../../../lib/api/notification';
import { useNotificationStore } from '../../../lib/store/NotificationStore';
import { Notification } from '../../../lib/types/notification';

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
  }, [data]);
  return {
    isLoading,
    data,
    hasMore,
    isError,
    error,
    loadMore,
  };
};
