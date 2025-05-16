import { Pagination } from '@/components/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFindJobsContext } from '../pages/FindJobs';
import JobCard from './JobCard';

type Props = {
  className?: string;
};

export default function FindJobsContainer({ className }: Props) {
  const { data } = useFindJobsContext();
  const {
    jobs,
    pagination: { totalItems, totalPages, currentPage },
  } = data.data;

  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  function handlePageChange(pageNumber: number) {
    const query = new URLSearchParams(search);
    query.set('page', pageNumber.toString());
    navigate(`${pathname}?${query}`);
  }
  return (
    <section
      className={`w-full  ${className}`}
      role='region'
      aria-label='job listing section'
    >
      <header aria-live='polite'>
        <h1 className='sr-only'>Available Jobs</h1>
        {totalItems > 0 && (
          <p className='mb-3 text-sm font-semibold text-slate-500 dark:text-slate-400'>
            {totalItems} jobs Found
          </p>
        )}
        {totalItems === 0 && (
          <p className='text-3xl dark:text-gray-500 text-gray-400'>
            No Maching Jobs found
          </p>
        )}
      </header>
      <div role='list' aria-label='job-listing'>
        {jobs &&
          jobs?.map((job) => (
            <JobCard key={job._id} className='mb-2' job={job} />
          ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          position='center'
        />
      )}
    </section>
  );
}
