import { useMyJobStore } from '../../../../lib/store/MyJobsStore';
import { getLastStatusUpdatedDate } from '../../../../utils';
import { UserCard } from '../../../../components/ui';
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
  const { company, position, jobLocation, country, createdAt } =
    myJobStore.selectedMyJob.job;
  return (
    <article
      className={`py-6 px-4 bg-white bg-black/[0.96] rounded-md ${className}`}
    >
      <JobHeader
        position={position}
        company={company}
        jobLocation={jobLocation}
        country={country}
        jobCreatedDate={createdAt.toString()}
      />
      <JobStatusBadge
        statusLabel={myJobStore.selectedMyJob.status}
        date={statusUpdatedDate}
        className="mt-4"
      />
      <UserCard user={myJobStore.selectedMyJob.recruiter} className="mt-4" />
    </article>
  );
}
