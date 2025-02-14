import HomeNavbar from '../features/navigations/components/home/HomeNavbar';
import { Outlet } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useUserInformation } from '../hooks/user/useUserInformation';

export default function HomePageLayout() {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;
  useUserInformation();

  return (
    <main className="w-full bg-gray-100   dark:bg-zinc-700 min-h-screen">
      <HomeNavbar isLoggedIn={isLoggedIn} />
      <div>
        <Outlet />
      </div>
    </main>
  );
}
