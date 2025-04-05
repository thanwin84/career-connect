import { useMutation } from '@/hooks';
import { updateUserRequest } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const { isPending, mutate: updateUser } = useMutation(updateUserRequest, {
    onSuccess: () => {
      toast.success('User information is updated successfully');
      navigate('/dashboard/profile');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    updateUser,
    isPending,
  };
};
