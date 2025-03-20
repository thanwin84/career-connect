import { useMutation } from '../../../../hooks';
import { toggleAccessStatusRequest } from '../../../../lib/api/admin';

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
