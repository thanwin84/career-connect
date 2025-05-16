import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/lib/store/userStore';
import { toast } from 'react-toastify';
import { loginRequest } from '@/lib/api';
import { useMutation } from '@/hooks';

export const useLoginUser = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { mutate: loginUser, isPending } = useMutation(loginRequest, {
    onSuccess: (data) => {
      userStore.addUser(data.data);
      toast.success('Login is successfull');
      navigate(from || '/', { replace: true });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    loginUser,
    isPending,
  };
};
