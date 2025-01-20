import { useEffect } from 'react';
import { useQuery } from '../../../hooks';
import { getJobApplicationListRequest } from '../services';
import { useCandidateStore } from '../../../store/CandidateStore';
import { useSearchParams } from 'react-router-dom';

export const useGetJobApplications = () => {
  const [params] = useSearchParams();
  const candidateStore = useCandidateStore();
  const { data, isError, isLoading, isSuccess, error, refetch } = useQuery(
    () => getJobApplicationListRequest(params.toString()),
    {
      onSuccess: (data) => {
        candidateStore.addCandidates(data.data.jobApplications);
      },
    }
  );
  useEffect(() => {
    refetch();
  }, [params]);
  return {
    data,
    isError,
    isLoading,
    isSuccess,
    error,
  };
};
