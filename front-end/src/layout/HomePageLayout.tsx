import HomeNavbar from '../features/navigations/components/home/HomeNavbar';
import { Outlet } from 'react-router-dom';
import { LoadingPage } from '../components/ui';
import { useUserStore } from '../store/userStore';
import { useUserInformation } from '../hooks/user/useUserInformation';

export default function HomePageLayout() {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;
  const { isLoading } = useUserInformation();

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <main className="w-full bg-slate-50  dark:bg-zinc-700 min-h-screen">
      <HomeNavbar isLoggedIn={isLoggedIn} />
      <div>
        <Outlet />
      </div>
    </main>
  );
}
