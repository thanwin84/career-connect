import LoginAndLogoutContainer from './LoginAndLogoutContainer';
import HomeNavLinks from './HomeNavLinks';
import HomeMobileNavbar from './HomeMobileNavbar';
import { Link } from 'react-router-dom';
import { Logo, ThemeToggle } from '../../../../components/ui';
type Props = {
  isLoggedIn: boolean;
};
export default function HomeNavbar({ isLoggedIn }: Props) {
  return (
    <nav className="bg-white dark:bg-zinc-800  flex justify-between border-b  border-gray-200 dark:border-none pt-4 px-8">
      <div className="hidden md:flex">
        <Link to="/">
          <Logo className="w-44" />
        </Link>
        <HomeNavLinks
          isLoggedIn={isLoggedIn}
          className="w-2/6 ml-10  font-serif"
        />
      </div>
      <HomeMobileNavbar className="md:hidden" />
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        <LoginAndLogoutContainer />
      </div>
    </nav>
  );
}
