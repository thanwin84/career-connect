import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/lib/store/userStore';
import { toast } from 'react-toastify';
import { loginRequest } from '@/lib/api';
import { useMutation } from '@/hooks';

export const useLoginUser = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();

  const { mutate: loginUser, isPending } = useMutation(loginRequest, {
    onSuccess: (data) => {
      userStore.addUser(data.data);
      toast.success('Login is successfull');
      navigate('/', { replace: true });
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
