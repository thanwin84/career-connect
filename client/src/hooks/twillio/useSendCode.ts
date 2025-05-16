import { toast } from 'react-toastify';
import useMutation from '../useMutation';

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
function sendCodeRequest(_variables: unknown): Promise<unknown> {
  throw new Error('Function not implemented.');
}
