import { Job, JobStatus } from '../../../../lib/types/job';
import JobStatusBadge from './JobStatusBadge';

type Props = {
  className?: string;
  job: Job;
  jobStatus: JobStatus;
  date: string;
};

export default function JobCard({ className, job, jobStatus, date }: Props) {
  const { position, company, country, jobLocation } = job;

  return (
    <article
      className={`bg-black/[0.96] bg-white   px-6 py-4 rounded-md flex gap-4  ${className} hover:border  hover:border-blue-500 `}
    >
      <span className="text-2xl my-auto font-extrabold text-blue-500">
        {company.substring(0, 1)}
      </span>
      <div className="space-y-3">
        <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {position}
        </p>
        <p className="flex gap-4 text-sm">
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {company}
          </span>
          <span className="text-slate-600 dark:text-slate-300">
            {jobLocation}, {country}
          </span>
        </p>
        <JobStatusBadge statusLabel={jobStatus} date={date} />
      </div>
    </article>
  );
}
