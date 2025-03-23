import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function TableTitle({ className, children }: Props) {
  return (
    <th
      className={`p-4 border border-gray-200 dark:border-gray-400 text-slate-700 dark:text-slate-200  ${className}`}
    >
      {children}
    </th>
  );
}
