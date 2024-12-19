import { JobStatus } from '../../../types';
import { jobStatusIcons } from '../../../app/constants/jobstatusIcons';

type Props = {
  className?: string;
  status: JobStatus;
};

export default function JobStatusIcon({ status }: Props) {
  return (
    <span aria-hidden="true" className="my-auto">
      {jobStatusIcons[status]}
    </span>
  );
}
