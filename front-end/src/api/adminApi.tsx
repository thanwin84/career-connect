import { useSearchParams } from "react-router-dom";
import { getUserListRequest, toggleAccessStatusRequest } from "../apiRequest";
import { useMutation, useQuery } from "../hooks";
import { useEffect, useMemo } from "react";

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

export const useUserToggleAccessStatus = () => {
  const {
    mutate: toggleUserAccessStatus,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation((userId: string) => toggleAccessStatusRequest(userId));

  return {
    toggleUserAccessStatus,
    isError,
    isPending,
    isSuccess,
    error,
  };
};
