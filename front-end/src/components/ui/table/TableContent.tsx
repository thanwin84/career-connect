import { ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function TableContent({ className, children }: Props) {
  return <tbody className={`${className}`}>{children}</tbody>;
}
