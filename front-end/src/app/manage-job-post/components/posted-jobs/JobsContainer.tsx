import { JobCard, AllJobsPaginationContainer } from '.';
import { useAllJobsContext } from '../../pages/PostedJobs';
import EmptyJobPage from './EmptyJobPage';

export default function JobsContainer() {
  const { data } = useAllJobsContext();
  const { jobs, pagination } = data.data;

  if (jobs.length === 0) {
    return <EmptyJobPage />;
  }
  return (
    <section role="region" aria-label="list of jobs created by you">
      <h2 className="font-bold text-slate-600 dark:text-slate-200 mb-2 px-6">
        {} job{jobs.length > 1 ? 's' : ''} found
      </h2>
      <section
        role="list"
        aria-label="job list created by you"
        className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 px-4"
      >
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </section>
      <div className="mr-2">
        {pagination.totalPages > 1 && <AllJobsPaginationContainer />}
      </div>
    </section>
  );
}
