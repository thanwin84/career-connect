import { ReactNode } from 'react';

type TableHeadProps = {
  className?: string;
  children: ReactNode;
  sticky?: boolean;
};

export function TableHead({
  className = '',
  children,
  sticky = false,
}: TableHeadProps) {
  const stickyClass = sticky ? 'sticky top-0' : '';

  return (
    <thead
      className={`bg-slate-100 dark:bg-stone-800  ${stickyClass} ${className}`}
    >
      {children}
    </thead>
  );
}
