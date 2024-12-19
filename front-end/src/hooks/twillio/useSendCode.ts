import { toast } from 'react-toastify';
import useMutation from '../useMutation';
import { sendCodeRequest } from '../../services/twillioService';

export const useSendCode = () => {
  const {
    mutate: sendAuthCode,
    isPending,
    isSuccess,
  } = useMutation(sendCodeRequest, {
    onSuccess: () => {
      toast.success('Verification code has been sent');
    },
    onError: (error) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    sendAuthCode,
    isPending,
    isSuccess,
  };
};
