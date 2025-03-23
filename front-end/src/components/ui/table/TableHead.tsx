import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function TableHead({ className, children }: Props) {
  return (
    <thead className={`bg-gray-50 dark:bg-zinc-800 ${className}`}>
      <tr>{children}</tr>
    </thead>
  );
}
