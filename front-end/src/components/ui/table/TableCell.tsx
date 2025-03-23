import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function TableCell({ className, children }: Props) {
  return <td className={`p-2 dark:text-slate-200 ${className}`}>{children}</td>;
}
