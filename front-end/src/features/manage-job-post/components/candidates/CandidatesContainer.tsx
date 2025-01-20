import { useSearchParams } from 'react-router-dom';
import { LoadingPage, Pagination } from '../../../../components/ui';
import { useGetJobApplications } from '../../hooks/useGetJobApplications';
import CandidatesTable from './CandidatesTable';
import { useCandidateStore } from '../../../../store/CandidateStore';

type Props = {
  className?: string;
};

export default function CandidateContainer({}: Props) {
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
  if (data && data.data.jobApplications.length == 0) {
    return (
      <div>
        <p className="text-2xl dark:text-slate-300 text-center">
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
        className=""
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
