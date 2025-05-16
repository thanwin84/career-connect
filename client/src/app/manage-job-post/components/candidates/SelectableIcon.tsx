import { MdOutlineCheckBox as SelectedIcon } from 'react-icons/md';
import { MdOutlineCheckBoxOutlineBlank as UnselectedIcon } from 'react-icons/md';

type Props = {
  className?: string;
  selectItem: (applicantId: string) => void;
  deselectItem: (applicantId: string) => void;
  applicantId: string;
  isSelected: boolean;
};

export default function SelectableIcon({
  className,
  isSelected,
  applicantId,
  selectItem,
  deselectItem,
}: Props) {
  return (
    <span
      className={`my-auto text-slate-500  dark:text-slate-400 ${className}`}
    >
      {isSelected ? (
        <SelectedIcon
          className='text-slate-600 dark:text-slate-300'
          onClick={() => deselectItem(applicantId)}
        />
      ) : (
        <UnselectedIcon onClick={() => selectItem(applicantId)} />
      )}
    </span>
  );
}
