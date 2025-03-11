import SidebardToggle from './SidebarToggle';
import NavbarActions from './NavbarActions';
import { Logo } from '../../../../../components/ui';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between px-4 py-4 shadow-sm bg-white dark:bg-black/[0.96] border-b dark:border-none">
      <SidebardToggle />
      <div>
        <Logo className="lg:hidden w-36" />
        <h1 className="hidden lg:block text-2xl text-slate-700 font-semibold dark:text-white">
          Dashboard
        </h1>
      </div>
      <div className="flex gap-3">
        <NavbarActions />
        <div className="border-l h-8 my-auto" />
        <Link
          className="px-4 py-2 dark:text-slate-200 my-auto hover:border-b hover:border-b-blue-500 hover:text-blue-700  font-semibold"
          to={'/post-jobs'}
        >
          Post Job
        </Link>
      </div>
    </nav>
  );
}
