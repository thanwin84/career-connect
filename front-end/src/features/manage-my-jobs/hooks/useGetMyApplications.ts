import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '../../../hooks';
import { useMyJobStore } from '../../../store/MyJobsStore';
import { JobStatus } from '../../../types';
import { getMyApplicationRequest } from '../services/jobApplicationRequests';

export const useGetMyApplications = (status: JobStatus) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const myJobStore = useMyJobStore();

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
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    // when tab changes job description will not be displayed
    myJobStore.selectMyJob(null);
  }, [status]);

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
