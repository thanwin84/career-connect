import { useMutation } from '@/hooks';
import { updateUserRequest } from '@/lib/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useUpdateUser = () => {
  const { userId } = useParams();
  const { isPending, mutate: updateUser } = useMutation(
    (user: FormData) => updateUserRequest(user, userId as string),
    {
      onSuccess: () => {
        toast.success('User information is updated successfully');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data.message);
      },
    }
  );
  return {
    updateUser,
    isPending,
  };
};
