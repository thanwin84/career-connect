import { useMutation } from '@/hooks';
import { logoutUserRequest } from '@/lib/api';
import { useUserStore } from '@/lib/store/userStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogout = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation(() => logoutUserRequest(), {
    onSuccess: () => {
      userStore.logoutUser();
      const broadcast = new BroadcastChannel('auth');
      broadcast.postMessage('logout');
      navigate('/');
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
