import { ReactNode } from 'react';

type TableFooterProps = {
  className?: string;
  children: ReactNode;
};

export function TableFooter({ className = '', children }: TableFooterProps) {
  return <tfoot className={`bg-gray-50 ${className}`}>{children}</tfoot>;
}
