import useMutation from '@/hooks/useMutation';
import { toggleAccessStatusRequest } from '@/lib/api';
import { toast } from 'react-toastify';

export const useUserToggleAccessStatus = () => {
  const {
    mutate: toggleUserAccessStatus,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation((userId: string) => toggleAccessStatusRequest(userId), {
    onSuccess: () => {
      toast.success('User access status is updated successfully');
    },
  });

  return {
    toggleUserAccessStatus,
    isError,
    isPending,
    isSuccess,
    error,
  };
};
