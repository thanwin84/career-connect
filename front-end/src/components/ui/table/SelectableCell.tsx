import { CheckedIcon, CheckIcon } from './icons';

type Props = {
  className?: string;
  isSelected: boolean;
  onSelect?: () => void;
};

export default function SelectableCell({
  className,
  isSelected = false,
  onSelect,
}: Props) {
  return (
    <td
      className={`px-6 py-4 dark:text-slate-200  cursor-pointer ${className}`}
      onClick={onSelect}
    >
      {isSelected ? (
        <CheckedIcon className='text-blue-600 dark:text-blue-400' size={20} />
      ) : (
        <CheckIcon className='text-slate-500' size={20} />
      )}
    </td>
  );
}
