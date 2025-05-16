import { CiSearch } from 'react-icons/ci';

type Props = {
  className?: string;
  action?: () => void;
};

export default function SearchIcon({ className, action }: Props) {
  return (
    <div
      onClick={action}
      className={`w-14 bg-white dark:text-slate-300 dark:bg-zinc-800 px-4 py-2 rounded-md border hover:shadow-sm ${className}`}
    >
      <CiSearch className='stroke-current stroke-2' size={20} />
    </div>
  );
}
