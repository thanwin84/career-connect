import { JobStatus } from '../../../../lib/types/job';
import { formatDate } from '../../../../utils';
import JobStatusIcon from './JobStatusIcon';

type Props = {
  className?: string;
  statusLabel: JobStatus;
  date: string;
};
const types: Record<JobStatus, string> = {
  applied: 'Applied ',
  hired: 'Hired ',
  interview: 'Interveiw ',
  declined: 'Declined ',
  shortListed: 'Shorted listed ',
  all: '',
};

export default function JobStatusBadge({
  className,
  statusLabel,
  date,
}: Props) {
  return (
    <p className={`flex gap-2 ${className}`}>
      <JobStatusIcon status={statusLabel} />
      <span className="text-slate-900 dark:text-slate-200">
        {types[statusLabel]}{' '}
      </span>
      <span className="text-slate-900 dark:text-slate-200">
        {formatDate(date)}
      </span>
    </p>
  );
}
