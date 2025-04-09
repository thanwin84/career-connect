import useQuery from '@/hooks/useQuery';
import { getUserByIdRequest } from '@/lib/api';
import { useParams } from 'react-router-dom';

export const useGetUserById = () => {
  const { userId } = useParams();
  const { data, isError, isLoading, isSuccess, error } = useQuery(() =>
    getUserByIdRequest(userId as string)
  );
  return {
    data,
    isError,
    isLoading,
    isSuccess,
    error,
  };
};
