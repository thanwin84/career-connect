import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getJobApplicationListRequest } from '@/lib/api';
import { useCandidateStore } from '@/lib/store/CandidateStore';
import { useQuery } from '@/hooks';

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
