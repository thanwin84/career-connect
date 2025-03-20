import { Link } from 'react-router-dom';
import { useLogout } from '../../../app/auth/hooks/useLogout';
import { motion } from 'motion/react';

type Props = {
  className?: string;
  isDropDownOpen: boolean;
  toggleDropdown: () => void;
};

export default function DropDownList({
  isDropDownOpen,
  toggleDropdown,
}: Props) {
  const { logout } = useLogout();
  return (
    <>
      {isDropDownOpen && (
        <motion.ul
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          id="dropdown-menu"
          role="menu"
          aria-label="user options menu"
          className="grid gap-2 w-full bg-white dark:bg-zinc-800 border border-slate-300 dark:border-slate-500 rounded-md  absolute left-0 mt-2 z-10 py-6 px-2"
        >
          <li
            role="menuitem"
            className="dark:text-slate-200 text-slate-800 font-semibold  text-center py-1 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:hover:text-slate-100 rounded-md"
          >
            <Link to="/dashboard/setting" onClick={toggleDropdown}>
              Setting
            </Link>
          </li>
          <li
            role="menuitem"
            className="dark:text-slate-200 text-slate-800 font-semibold  text-center py-1 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:hover:text-slate-100 rounded-md"
          >
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li
            role="menuitem"
            className="dark:text-slate-200 text-slate-800 font-semibold  text-center py-1 hover:bg-gray-100 dark:hover:bg-zinc-700 dark:hover:text-slate-100 rounded-md"
          >
            <button type="button" onClick={() => logout({})}>
              Logout
            </button>
          </li>
        </motion.ul>
      )}
    </>
  );
}
