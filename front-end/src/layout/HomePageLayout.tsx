import HomeNavbar from '../app/homepage/components/navigation/HomeNavbar';
import { Outlet } from 'react-router-dom';
import { useUserStore } from '../lib/store/userStore';
import { useUserInformation } from '../hooks/user/useUserInformation';

export default function HomePageLayout() {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;
  useUserInformation();

  return (
    <main className="w-full bg-gray-100 dark:bg-zinc-900    min-h-screen">
      <HomeNavbar isLoggedIn={isLoggedIn} />
      <div>
        <Outlet />
      </div>
    </main>
  );
}
