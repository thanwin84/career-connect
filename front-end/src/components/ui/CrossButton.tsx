import { RxCross2 } from 'react-icons/rx';
type Props = {
  className?: string;
  action: () => void;
};

export default function CrossButton({ className, action }: Props) {
  return (
    <RxCross2
      onClick={action}
      size={22}
      className={`w-6 h-6 p-1 rounded-md cursor-pointer text-gray-600 hover:bg-gray-200  dark:text-gray-300 dark:hover:bg-stone-500 transition-colors duration-150 ${className}`}
      aria-label='Clear button'
      role='button'
      tabIndex={0}
    />
  );
}
