import { ReactNode } from 'react';
import { useComboContext } from './ComboBox';

type Props<T extends { value: string }> = {
  children: ReactNode;
  value: T;
  className?: string;
};

export default function ComboBoxListItem<T extends { value: string }>({
  value,
  children,
  className,
}: Props<T>) {
  const { handleClick } = useComboContext();
  return (
    <li
      className={`cursor-pointer ${className}`}
      onClick={() => {
        handleClick(value);
      }}
    >
      {children}
    </li>
  );
}
