import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function TableRow({ className, children }: Props) {
  return (
    <tr
      className={`text-center hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer ${className}`}
    >
      {children}
    </tr>
  );
}
