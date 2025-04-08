import { CrossButton, Sort, TrashButton } from '@/components/ui';
import SearchBar from './SearchBar';

type Props = {
  className?: string;
  totalSelectItems: number;
  onClearAll: () => void;
};

const sortOptions = [
  { value: 'asc', label: 'Sort By Newest' },
  { value: 'desc', label: 'Sort by oldest' },
];
export default function UserTableToolbar({
  className = '',
  totalSelectItems,
  onClearAll,
}: Props) {
  const isEmpty = totalSelectItems === 0;

  return (
    <div
      className={`text-lg h-12 mb-2 px-4 py-2 
         text-gray-800 ${
           !isEmpty
             ? 'bg-slate-100 dark:bg-stone-600 rounded-md shadow '
             : 'bg-transparent'
         } dark:text-gray-100 ${className}`}
    >
      {isEmpty ? (
        <div className='flex justify-between  font-semibold dark:text-slate-200 '>
          <p className='text-lg'>Manage Users</p>
          <div className='flex gap-4'>
            <SearchBar />
            <div className='w-[230px] '>
              <Sort options={sortOptions} />
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-between items-center'>
          <div className='flex gap-4 ml-1 items-center'>
            <CrossButton action={onClearAll} />
            <p className='text-sm font-medium'>{totalSelectItems} selected</p>
          </div>
          <TrashButton onClick={() => 1} />
        </div>
      )}
    </div>
  );
}
