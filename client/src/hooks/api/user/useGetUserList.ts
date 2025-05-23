import { useSearchParams } from 'react-router-dom';
import { getUserListRequest } from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useGetUserList = () => {
  const [searchParams] = useSearchParams();
  const {
    data: userList,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['userList', searchParams.toString()],
    queryFn: () => getUserListRequest(searchParams.toString()),
    placeholderData: keepPreviousData,
  });

  return {
    userList,
    isError,
    isLoading,
    isSuccess,
  };
};
