import { toast } from 'react-toastify';
import useMutation from '../useMutation';
import { verifyCodeRequest } from '../../services/twillioService';

export const useVerifyCode = () => {
  const { mutate: verifyCode, isPending } = useMutation(verifyCodeRequest, {
    onSuccess: (data) => {
      if (data === 'approved') toast.success('Verificatin is successfull');
    },
    onError: (error) => {
      toast.error(error?.response?.data.message);
    },
  });

  return {
    verifyCode,
    isPending,
  };
};
