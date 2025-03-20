import { FaCaretDown } from 'react-icons/fa';
import UserIcon from '../UserIcon';
import { useUserStore } from '../../../lib/store/userStore';

type Props = {
  className?: string;
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
};

export default function DropDownButton({
  className,
  toggleDropdown,
  isDropdownOpen,
}: Props) {
  const userStore = useUserStore();
  return (
    <button
      type="button"
      className={`w-full px-2 py-1 rounded-md flex justify-between    dark:bg-zinc-800 border border-slate-200 hover:border-blue-400 dark:border-slate-600 dark:hover:border-blue-600 dark:text-slate-100 ${className} `}
      onClick={() => toggleDropdown()}
      aria-label={
        isDropdownOpen
          ? 'close user options dropdown'
          : 'Open user options dropdown'
      }
      aria-haspopup="true"
      aria-expanded={isDropdownOpen}
      aria-controls="dropdown-menu"
    >
      <UserIcon url={userStore.user?.avatar?.url || ''} />
      <span className="my-auto">{userStore.user?.firstName}</span>
      <span className="my-auto">
        <FaCaretDown />
      </span>
    </button>
  );
}
