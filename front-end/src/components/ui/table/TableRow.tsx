import { ReactNode } from 'react';

type TableRowProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export function TableRow({ className = '', children, onClick }: TableRowProps) {
  return (
    <tr className={`  ${className}`} onClick={onClick}>
      {children}
    </tr>
  );
}
