import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { registerUserRequest } from '../../../lib/api/auth';

export const useCreateUser = () => {
  const navigate = useNavigate();
  const {
    mutate: createUser,
    isError,
    isSuccess,
    error,
    isPending,
  } = useMutation(registerUserRequest, {
    onSuccess: () => {
      toast.success('Registration is successfull');
      navigate('/email-confirmation');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    isPending,
    createUser,
    isError,
    isSuccess,
    error,
  };
};
