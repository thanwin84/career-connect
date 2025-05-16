import { ReactNode } from 'react';

type Props = {
  className?: string;
  id: string;
  children: ReactNode;
};

const ComboDropDownList = ({ className = '', id, children }: Props) => {
  return (
    <ul
      id={id}
      role='listbox'
      className={`mt-2 pt-4 px-1 pb-4  max-h-56 overflow-y-auto  border border-gray-200 dark:border-stone-700 dark:bg-stone-800 rounded-md absolute bg-white w-full ${className}`}
    >
      {children}
    </ul>
  );
};
export default ComboDropDownList;
