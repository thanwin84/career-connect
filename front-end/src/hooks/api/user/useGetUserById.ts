import useQuery from '@/hooks/useQuery';
import { getUserByIdRequest } from '@/lib/api';
import { useUserStore } from '@/lib/store/userStore';
import { useParams } from 'react-router-dom';

export const useGetUserById = () => {
  const { userId } = useParams();
  const userStore = useUserStore();
  const { data, isError, isLoading, isSuccess, error } = useQuery(
    () => getUserByIdRequest(userId as string),
    {
      onSuccess: (data) => {
        userStore.addCurrentSelectedUser(data.data);
      },
    }
  );
  return {
    data,
    isError,
    isLoading,
    isSuccess,
    error,
  };
};
