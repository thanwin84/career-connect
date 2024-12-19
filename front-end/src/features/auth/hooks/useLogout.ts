import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { useUserStore } from '../../../store/userStore';
import { logoutUserRequest } from '../services/authService';

export const useLogout = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation(() => logoutUserRequest(), {
    onSuccess: () => {
      userStore.logoutUser();
      const broadcast = new BroadcastChannel('auth');
      broadcast.postMessage('logout');
      broadcast.close();
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
