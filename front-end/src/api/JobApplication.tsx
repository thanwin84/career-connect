import { toast } from "react-toastify";
import {
  createJobApplicationRequest,
  getJobApplicationStatsRequest,
  getMyApplicationRequest,
} from "../apiRequest";
import { useMutation, useQuery } from "../hooks";
import { JobStatus } from "../types";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../contexts/AppProvider";

export const useCreateJobApplication = () => {
  const {
    mutate: createJobApplication,
    isPending,
    isSuccess,
    resetState,
    isError,
    error,
  } = useMutation(createJobApplicationRequest, {
    onSuccess: () => {
      toast.success("You've applied successfully");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
  return {
    createJobApplication,
    isPending,
    isSuccess,
    resetState,
    isError,
    error,
  };
};

export const useGetMyApplications = (status: JobStatus) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const searchParams = new URLSearchParams(location.search)
  const page = searchParams.get("page");
  const {
    myJobStore: { actions },
  } = useAppContext();

  const { data, isLoading, isError, isSuccess, refetch } = useQuery(() =>
    getMyApplicationRequest(
      `/job-applications/my-applications?page=${
        page || 1
      }&limit=5&status=${status}`
    )
  );
  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    // this useEffect handles the  tab changes
    // when tab changes, current page should be set to 1
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    // when tab changes job description will not be displayed
    actions.selectMyJob(null);
  }, [status]);

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useJobApplicationStats = () => {
  const { data, isError, isLoading, isSuccess, refetch } = useQuery(
    getJobApplicationStatsRequest
  );

  return {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};
