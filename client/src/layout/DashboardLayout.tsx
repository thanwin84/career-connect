import {
  BigSidebar,
  Navbar,
  SmallSidebar,
} from '@/app/dashboard/components/navigation';
import {
  Sidebar,
  Sheet,
  SideContent,
  SidebarModal,
} from '@/components/ui/sheet';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <Sheet className='dark:bg-stone-800'>
      <Sidebar className='dark:bg-stone-800'>
        <BigSidebar />
      </Sidebar>
      <SideContent className='dark:bg-stone-800'>
        <Navbar />
        <div className='dark:bg-stone-900 bg-slate-50 min-h-screen'>
          <Outlet />
        </div>
      </SideContent>
      <SidebarModal>
        <SmallSidebar />
      </SidebarModal>
    </Sheet>
  );
}
