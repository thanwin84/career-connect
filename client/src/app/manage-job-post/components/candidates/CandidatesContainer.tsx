import { LoadingPage, Pagination } from '@/components/ui';
import { useCandidateStore } from '@/lib/store/CandidateStore';
import { useSearchParams } from 'react-router-dom';
import CandidatesTable from './CandidatesTable';
import { useGetJobApplications } from '@/hooks/api';

export default function CandidateContainer() {
  const { data, isLoading } = useGetJobApplications();
  const [params, setParams] = useSearchParams();
  const candidateStore = useCandidateStore();
  function handlePageChange(page: number) {
    params.set('page', page.toString());
    setParams(params);
  }

  if (!data) {
    return <LoadingPage />;
  }

  if (data && data.data.jobApplications?.length == 0) {
    return (
      <div>
        <p className='text-2xl dark:text-slate-300 text-center'>
          When job seekers will apply to job, you will see a list of candidates
          list here.
        </p>
      </div>
    );
  }

  const { pagination } = data.data;
  return (
    <div>
      <CandidatesTable
        candidates={candidateStore.jobApplicants || []}
        isLoading={isLoading}
        className=''
      />
      {pagination.totalPages > 1 && (
        <Pagination
          handlePageChange={handlePageChange}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  );
}
