import { useMutation } from '../../../hooks';
import { markAsReadRequest } from '../../../lib/api/notification';

export const useMarkAsReadNotifications = () => {
  const {
    isError,
    isPending,
    isSuccess,
    error,
    mutate: markAsRead,
  } = useMutation(markAsReadRequest);
  return {
    isError,
    isPending,
    isSuccess,
    error,
    markAsRead,
  };
};
