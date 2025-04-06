import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function TableBody({ className, children }: Props) {
  return (
    <tbody
      className={`bg-white dark:bg-stone-900 divide-y divide-gray-200 dark:divide-zinc-800 ${className}`}
    >
      {children}
    </tbody>
  );
}
