import useMutation from '@/hooks/useMutation';
import { markAsReadRequest } from '@/lib/api';

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
