import { Outlet } from 'react-router-dom';
import { Navbar } from '../../../features/navigations/components/dashboardNavigations';

type Props = {
  className?: string;
};

export default function DashboardMainContent({ className }: Props) {
  return (
    <div className={`w-full ${className} `}>
      <header>
        <Navbar />
      </header>
      <main className="bg-slate-50 dark:bg-zinc-700 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
