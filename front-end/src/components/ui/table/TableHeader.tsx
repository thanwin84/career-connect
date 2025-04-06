import { ReactNode, useState } from 'react';
type SortDirection = 'asc' | 'desc' | null;
type TableHeaderProps = {
  className?: string;
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sortDirection?: SortDirection;
  getSortingDirection?: (direction: SortDirection) => void;
};

export default function TableHeader({
  className,
  children,
  align = 'left',
  sortable = false,
  sortDirection = null,
  getSortingDirection: onSort,
}: TableHeaderProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];
  const sortableClass = sortable ? 'cursor-pointer' : '';
  const [_sortDirection, setSortDirection] = useState(sortDirection);
  const toggleSortDirection = () => {
    if (_sortDirection === 'asc') {
      setSortDirection('desc');
      if (onSort) {
        onSort('desc');
      }
    } else {
      setSortDirection('asc');
      if (onSort) {
        onSort('asc');
      }
    }
  };

  const renderIcon = () => {
    if (!sortable) {
      return null;
    }
    if (_sortDirection === 'asc') {
      return <span className='ml-1'>↑</span>;
    } else if (_sortDirection === 'desc') {
      return <span className='ml-1'>↓</span>;
    }
    return <span className='ml-1'>↕</span>;
  };

  return (
    <th
      onClick={toggleSortDirection}
      scope='col'
      className={`px-6 py-3 text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider whitespace-nowrap ${alignClass} ${sortableClass} ${className}`}
    >
      {children}
      {sortable && renderIcon()}
    </th>
  );
}
