import HomeNavbar from '@/app/homepage/components/navigation/HomeNavbar';
import { useCurrentUser } from '@/hooks/api';
import { useUserStore } from '@/lib/store/userStore';
import { Outlet } from 'react-router-dom';

export default function HomePageLayout() {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;
  useCurrentUser();

  return (
    <main className='w-full bg-gray-100 dark:bg-zinc-900    min-h-screen'>
      <HomeNavbar isLoggedIn={isLoggedIn} />
      <div>
        <Outlet />
      </div>
    </main>
  );
}
