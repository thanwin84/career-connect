import { useMutation } from '@/hooks';
import { toggleTwoStepAuthRequest } from '@/lib/api';
import { useUserStore } from '@/lib/store/userStore';
import { toast } from 'react-toastify';

export const useToggleAuthStatus = () => {
  const userStore = useUserStore();
  const {
    mutate: updateTwoStepAuthStatus,
    isPending,
    isSuccess,
    resetState,
  } = useMutation(toggleTwoStepAuthRequest, {
    onSuccess: () => {
      toast.success('Two step auth is updated successfully');
      userStore.toggleTwoStepAuthentication();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    updateTwoStepAuthStatus,
    isPending,
    isSuccess,
    resetState,
  };
};
