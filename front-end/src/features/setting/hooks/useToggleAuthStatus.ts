import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { useUserStore } from '../../../store/userStore';
import { toggleTwoStepAuthRequest } from '../services/setting.service';

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
