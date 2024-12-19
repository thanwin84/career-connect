import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../store/userStore';
import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { loginRequest } from '../services/authService';

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
