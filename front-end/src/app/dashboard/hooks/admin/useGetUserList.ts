import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '../../../../hooks';
import { getUserListRequest } from '../../../../lib/api/admin';

export const useGetUserList = () => {
  const [searchParams] = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const { data, isError, isLoading, isSuccess, refetch, error } = useQuery(() =>
    getUserListRequest(params.toString())
  );

  useEffect(() => {
    refetch();
  }, [params]);

  return {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
    error,
  };
};
