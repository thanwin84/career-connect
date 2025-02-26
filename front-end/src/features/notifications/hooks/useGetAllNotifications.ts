import { useEffect } from 'react';
import { useInfiniteQuery } from '../../../hooks/useInifiniteQuery';
import { getAllNoficationsRequest } from '../service';
import { useNotificationStore } from '../../../store/NotificationStore';
import { Notification } from '../../../types';

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
