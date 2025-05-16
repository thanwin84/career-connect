import { ReactNode } from 'react';

type TableCellProps = {
  className?: string;
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
};

export function TableCell({
  className = '',
  children,
  align = 'left',
  truncate = false,
}: TableCellProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  const truncateClass = truncate ? 'truncate' : 'whitespace-nowrap';

  return (
    <td
      className={`px-6 py-4 text-sm text-slate-700 dark:text-slate-300 ${truncateClass} ${alignClass} ${className}`}
    >
      {children}
    </td>
  );
}
