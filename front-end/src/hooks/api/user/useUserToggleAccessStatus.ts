import useMutation from '@/hooks/useMutation';
import { toggleAccessStatusRequest } from '@/lib/api';

export const useUserToggleAccessStatus = () => {
  const {
    mutate: toggleUserAccessStatus,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation((userId: string) => toggleAccessStatusRequest(userId));

  return {
    toggleUserAccessStatus,
    isError,
    isPending,
    isSuccess,
    error,
  };
};
