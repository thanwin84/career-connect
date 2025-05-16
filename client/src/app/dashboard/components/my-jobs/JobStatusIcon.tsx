import { jobStatusIcons } from '@/lib/constants/jobstatusIcons';
import { JobStatus } from '@/lib/types';

type Props = {
  className?: string;
  status: JobStatus;
};

export default function JobStatusIcon({ status }: Props) {
  return (
    <span aria-hidden='true' className='my-auto'>
      {jobStatusIcons[status]}
    </span>
  );
}
