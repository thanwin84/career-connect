import { ReactNode } from 'react';

type TableProps = {
  className?: string;
  children: ReactNode;
  maxWidth?: string;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  isDataLoading?: boolean;
};

export default function Table({
  className = '',
  children,
  bordered = false,
  isDataLoading = false,
}: TableProps) {
  const borderedClass = bordered
    ? 'border-collapse border border-gray-200'
    : 'divide-y divide-gray-200 dark:divide-stone-800';

  return (
    <div className='w-full '>
      <div
        className={`mx-auto h-full overflow-x-auto rounded-lg shadow-md ${
          isDataLoading ? 'opacity-50' : ''
        }    ${className}`}
      >
        <table className={` w-full  table-auto ${borderedClass} ${className}`}>
          {children}
        </table>
      </div>
    </div>
  );
}
