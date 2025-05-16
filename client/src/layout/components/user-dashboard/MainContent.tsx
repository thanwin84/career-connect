import { Navbar } from '@/app/dashboard/components/navigation';
import { Outlet } from 'react-router-dom';

type Props = {
  className?: string;
};

export default function DashboardMainContent({ className }: Props) {
  return (
    <div className={`w-full ${className} `}>
      <header>
        <Navbar />
      </header>
      <main className='bg-slate-50 dark:bg-zinc-900 min-h-screen'>
        <Outlet />
      </main>
    </div>
  );
}
