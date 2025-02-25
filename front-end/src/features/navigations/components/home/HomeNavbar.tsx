import LoginAndLogoutContainer from './LoginAndLogoutContainer';
import HomeMobileNavbar from './HomeMobileNavbar';
import { Link } from 'react-router-dom';
import { Logo, ThemeToggle } from '../../../../components/ui';
import NotificationContainer from '../../../notifications/components/NotificationContainer';
type Props = {
  isLoggedIn: boolean;
};
export default function HomeNavbar({ isLoggedIn }: Props) {
  return (
    <nav className="bg-white dark:bg-zinc-800  flex justify-between border-b  border-gray-200 dark:border-none px-6 py-4">
      <div className="hidden md:flex md:items-center">
        <Link to="/">
          <Logo className="w-44" />
        </Link>
      </div>
      <HomeMobileNavbar className="md:hidden" />
      <div className="flex gap-4">
        <NotificationContainer />
        <ThemeToggle />
        <LoginAndLogoutContainer />
        {!isLoggedIn && (
          <Link
            className="font-semibold px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            to={'/register'}
          >
            Sign Up
          </Link>
        )}

        {isLoggedIn && (
          <>
            <div className="border-l h-8 my-auto" />
            <Link
              className="px-4 py-2 dark:text-slate-200 my-auto hover:border-b hover:border-b-blue-500 hover:text-blue-700  font-semibold"
              to={'/post-jobs'}
            >
              Post Job
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
