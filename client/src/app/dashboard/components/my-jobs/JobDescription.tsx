import { UserCard } from '@/components/ui';
import { useMyJobStore } from '@/lib/store/MyJobsStore';
import { getLastStatusUpdatedDate } from '@/utils';
import JobHeader from './JobHeader';
import JobStatusBadge from './JobStatusBadge';

type Props = {
  className?: string;
};

export default function JobDescription({ className }: Props) {
  const myJobStore = useMyJobStore();

  if (!myJobStore.selectedMyJob) {
    return null;
  }
  const statusUpdatedDate = getLastStatusUpdatedDate(
    myJobStore.selectedMyJob.statusHistory
  );
  const { job, company, createdAt } = myJobStore.selectedMyJob;
  return (
    <article
      className={`py-6 px-4 bg-white dark:bg-stone-800 rounded-md ${className}`}
    >
      <JobHeader
        position={job.position}
        company={company}
        jobLocation={job.jobLocation.city}
        country={job.jobLocation.country}
        jobCreatedDate={createdAt}
      />
      <JobStatusBadge
        statusLabel={myJobStore.selectedMyJob.status}
        date={statusUpdatedDate}
        className='mt-4'
      />
      <UserCard user={myJobStore.selectedMyJob.recruiter} className='mt-4' />
    </article>
  );
}
