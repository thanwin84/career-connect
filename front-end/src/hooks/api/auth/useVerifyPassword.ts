import { useMutation } from '@/hooks';
import { reEnterPasswordRequest } from '@/lib/api';
import { toast } from 'react-toastify';

export const useVerifyPassword = () => {
  const {
    mutate: verifyPassword,
    isPending,
    isSuccess,
    isError,
    resetState,
  } = useMutation(reEnterPasswordRequest, {
    onSuccess: () => {},
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });

  return {
    verifyPassword,
    isError,
    isSuccess,
    isPending,
    resetState,
  };
};
