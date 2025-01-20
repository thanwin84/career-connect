import { JobStatus } from '../../../../types';

type Props = {
  className?: string;
  type: JobStatus;
};
const types: Record<JobStatus, string> = {
  applied: 'bg-gray-400 dark:bg-gray-500 text-white',
  hired: 'bg-green-500 text-white',
  interview: 'bg-orange-500 text-white',
  declined: 'bg-red-500 text-white',
  shortListed: 'bg-green-500 dark:bg-green-500 text-white',
  all: '',
};
export default function Status({ className, type }: Props) {
  return (
    <span
      className={`p-1 dark:text-slate-200 rounded-md ${types[type]} ${className}`}
    >
      {type}
    </span>
  );
}
