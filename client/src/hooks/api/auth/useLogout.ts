import { useMutation, usePostLogoutRedirect } from '@/hooks';
import { logoutUserRequest } from '@/lib/api';
import { useUserStore } from '@/lib/store/userStore';
import { toast } from 'react-toastify';

export const useLogout = () => {
  const userStore = useUserStore();
  const redirectIfNeeded = usePostLogoutRedirect();

  const { mutate: logout, isPending } = useMutation(() => logoutUserRequest(), {
    onSuccess: () => {
      const broadcast = new BroadcastChannel('auth');
      broadcast.postMessage('logout');
      userStore.logoutUser();
      redirectIfNeeded();
      toast.success('You are logged out successfully');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
  return {
    logout,
    isPending,
  };
};
