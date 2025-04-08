import { useMutation } from '@/hooks';
import { updateUserRequest } from '@/lib/api';
import { toast } from 'react-toastify';

export const useUpdateUser = () => {
  const { isPending, mutate: updateUser } = useMutation(updateUserRequest, {
    onSuccess: () => {
      toast.success('User information is updated successfully');
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
