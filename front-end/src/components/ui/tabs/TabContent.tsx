import { ReactNode } from 'react';
import { useTabContext } from './Tabs';

type Props = {
  value: string;
  children: ReactNode;
  className?: string;
};

export default function TabContent({ value, children, className }: Props) {
  const { currentTab } = useTabContext('TabContent');
  return (
    <>
      {value === currentTab && (
        <div role="tabpanel" id={`panel-${value}`} className={`${className}`}>
          {children}
        </div>
      )}
    </>
  );
}
