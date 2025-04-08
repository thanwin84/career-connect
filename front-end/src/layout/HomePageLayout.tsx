import HomeNavbar from '@/app/homepage/components/navigation/HomeNavbar';
import { useCurrentUser } from '@/hooks/api';
import { useUserStore } from '@/lib/store/userStore';
import { Outlet } from 'react-router-dom';

export default function HomePageLayout() {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;

  // Fetch current user data on load
  useCurrentUser();

  return (
    <main className='relative w-full min-h-screen bg-slate-50 dark:bg-stone-800'>
      <HomeNavbar
        className='fixed top-0 left-0 w-full z-20 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md shadow-sm'
        isLoggedIn={isLoggedIn}
      />

      <div className='pt-16 px-4 md:px-8'>
        <Outlet />
      </div>
    </main>
  );
}
