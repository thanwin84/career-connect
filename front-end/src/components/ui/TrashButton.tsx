import { FaTrash } from 'react-icons/fa';

type Props = {
  className?: string;
  onClick: () => void;
};

export default function TrashButton({ className, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150 ${className}`}
      aria-label='Delete selected items'
    >
      <FaTrash />
    </button>
  );
}
