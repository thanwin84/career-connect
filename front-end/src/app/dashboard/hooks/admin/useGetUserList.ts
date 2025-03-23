import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '../../../../hooks';
import { getUserListRequest } from '../../../../lib/api/admin';

export const useGetUserList = () => {
  const [params] = useSearchParams();

  const { data, isError, isLoading, isSuccess, refetch, error } = useQuery(() =>
    getUserListRequest(params.toString())
  );
  console.log(params.toString());

  useEffect(() => {
    refetch();
  }, [params.toString()]);

  return {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
    error,
  };
};
