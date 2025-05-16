import { toast } from 'react-toastify';
import useMutation from '../useMutation';

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
function verifyCodeRequest(_variables: unknown): Promise<unknown> {
  throw new Error('Function not implemented.');
}
