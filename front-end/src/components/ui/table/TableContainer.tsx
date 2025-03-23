import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function TableContainer({ className, children }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-lg shadow-md bg-white dark:bg-zinc-900 ${className}`}
    >
      <table className="rounded-md w-full bg-white dark:bg-zinc-900 shadow-md">
        {children}
      </table>
    </div>
  );
}
