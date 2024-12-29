import { RxCross2 as CrossIcon } from 'react-icons/rx';
import { IoMenu } from 'react-icons/io5';
import { usePostLayoutContext } from '../../../../contexts/postLayoutContext';

type Props = {
  className?: string;
};

export default function CloseButton({ className }: Props) {
  const { toggleCollapsed, collapsed } = usePostLayoutContext();
  return (
    <button
      onClick={toggleCollapsed}
      className={`p-2 text-nowrap mb-4  gap-4  h-10 text-slate-800 dark:text-slate-100 ${className}`}
    >
      {!collapsed ? (
        <div className="flex gap-4">
          <span className="my-auto">
            <CrossIcon strokeWidth={1.5} />
          </span>
          <span>Collapse</span>
        </div>
      ) : (
        <span className="my-auto ">
          <IoMenu size={18} />
        </span>
      )}
    </button>
  );
}
