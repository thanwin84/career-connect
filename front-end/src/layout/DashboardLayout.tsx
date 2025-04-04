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
    <Sheet>
      <Sidebar>
        <BigSidebar />
      </Sidebar>
      <SideContent>
        <Navbar />
        <div className='dark:bg-zinc-800 bg-slate-50 min-h-screen'>
          <Outlet />
        </div>
      </SideContent>
      <SidebarModal>
        <SmallSidebar />
      </SidebarModal>
    </Sheet>
  );
}
