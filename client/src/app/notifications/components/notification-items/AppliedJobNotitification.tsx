import { formatDate } from '@/utils';

type Props = {
  className?: string;
  date: string;
  jobTitle: string;
};

export default function AppliedJobNotification({
  date,
  className,
  jobTitle,
}: Props) {
  return (
    <div>
      <p
        className={`mb-1 py-1 text-slate-700 dark:text-slate-200 ${className}`}
      >
        {`A candidate  has applied to  ${jobTitle}`}
      </p>
      <span className='text-sm text-slate-500 dark:text-slate-300'>
        {formatDate(date)}
      </span>
    </div>
  );
}
