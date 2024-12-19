import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { registerUserRequest } from '../services/authService';

export const useCreateUser = () => {
  const navigate = useNavigate();
  const { mutate: createUser, isPending } = useMutation(registerUserRequest, {
    onSuccess: () => {
      toast.success('Registration is successfull');
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    isPending,
    createUser,
  };
};
