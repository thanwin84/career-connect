import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@/hooks';
import { changePasswordRequest } from '@/lib/api';

export const useChangePassword = () => {
  const navigate = useNavigate();
  const { mutate: changePassword, isPending } = useMutation(
    changePasswordRequest,
    {
      onSuccess: () => {
        toast.success('Your password is updated successfully');
        navigate('/dashboard/setting');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data.message);
      },
    }
  );
  return {
    changePassword,
    isPending,
  };
};
