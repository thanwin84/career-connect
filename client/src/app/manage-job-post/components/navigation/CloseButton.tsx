import { RxCross2 as CrossIcon } from 'react-icons/rx';
import { IoMenu } from 'react-icons/io5';
import { useSheetContext } from '@/components/ui/sheet/Sheet';

type Props = {
  className?: string;
};

export default function CloseButton({ className }: Props) {
  const { toggleCollapse, isCollapsed } = useSheetContext();
  return (
    <button
      onClick={toggleCollapse}
      className={`w-full  mb-4   text-slate-800 dark:text-slate-100 flex items-center justify-center ${className}`}
    >
      {!isCollapsed ? (
        <div className='w-full flex gap-4'>
          <span className='my-auto'>
            <CrossIcon strokeWidth={1.5} />
          </span>
          <span>Collapse</span>
        </div>
      ) : (
        <span className='my-auto '>
          <IoMenu size={18} />
        </span>
      )}
    </button>
  );
}
