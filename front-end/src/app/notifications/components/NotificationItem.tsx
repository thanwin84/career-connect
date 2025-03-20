import { FaCircle } from 'react-icons/fa';
import { formatDate } from '../../../utils';
type Props = {
  className?: string;
  company: string;
  position: string;
  status: string;
  date: string;
};

export default function NotificationItem({
  company = 'Meta',
  position = 'Frontend Engineer',
  status = 'ShortListed',
  date,
  className,
}: Props) {
  return (
    <li className={`flex gap-2 py-1 ${className}`}>
      <FaCircle size={10} className="mt-2 text-blue-500" />
      <div className="">
        <p className="text-sm text-slate-800 dark:text-slate-300 text-justify text-pretty">
          <span className="font-semibold">{position}</span> position at{' '}
          <span>{company}</span> is updated to{' '}
          <span className="font-semibold">{status}</span>
        </p>
        <span className="text-sm text-slate-500 dark:text-slate-300">
          {formatDate(date)}
        </span>
      </div>
    </li>
  );
}
