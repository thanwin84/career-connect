import { useMutation } from '../../../hooks';
import { markAsReadRequest } from '../service';

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
