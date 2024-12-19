import { Link } from "react-router-dom";
import { useLogout } from "../../../features/auth/hooks/useLogout";

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
        <ul
          id="dropdown-menu"
          role="menu"
          aria-label="user options menu"
          className="grid gap-2 w-full bg-white dark:bg-zinc-800 border border-slate-300 rounded-md p-1 absolute left-0 mt-2 z-10"
        >
          <li role="menuitem" className="text-center">
            <Link
              to="/dashboard/setting"
              className="w-full  text-center bg-white dark:text-slate-100 dark:bg-zinc-800 text-slate-900 hover:text-blue-800 hover:font-bold dark:hover:text-blue-500  px-4 py-1 rounded-md"
              onClick={toggleDropdown}
            >
              Setting
            </Link>
          </li>
          <li role="menuitem">
            <button
              type="button"
              className="mb-2 bg-white dark:text-slate-100 dark:bg-zinc-800 text-slate-900 hover:text-blue-800 hover:font-bold dark:hover:text-blue-500  px-4 py-1 rounded-md  w-full"
              onClick={() => logout({})}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </>
  );
}
