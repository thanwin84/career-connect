import { MdOutlineCheckBoxOutlineBlank as UnselectedIcon } from 'react-icons/md';
import { FaMinusSquare } from 'react-icons/fa';
type Props = {
  className?: string;
  selectAll: () => void;
  deselectAll: () => void;
  isSelected: boolean;
};

export default function HeaderSelectableIcon({
  className,
  isSelected,
  selectAll,
  deselectAll,
}: Props) {
  return (
    <span className={`my-auto text-slate-500 dark:text-slate-400 ${className}`}>
      {!isSelected ? (
        <UnselectedIcon className='text-slate-600' onClick={selectAll} />
      ) : (
        <FaMinusSquare onClick={deselectAll} />
      )}
    </span>
  );
}
