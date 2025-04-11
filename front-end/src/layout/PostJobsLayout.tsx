import BigSidebar from '@/app/manage-job-post/components/navigation/BigSidebar';
import MainNavbar from '@/app/manage-job-post/components/navigation/MainNavbar';
import MobileSidebar from '@/app/manage-job-post/components/navigation/MobileSideBar';
import { PostLayoutProvider } from '@/app/manage-job-post/context/postLayoutContext';
import {
  Sheet,
  Sidebar,
  SidebarModal,
  SideContent,
} from '@/components/ui/sheet';
import { Outlet } from 'react-router-dom';

type Props = {
  className?: string;
};

export default function PostJobsLayout({}: Props) {
  return (
    <PostLayoutProvider>
      <Sheet className='dark:bg-stone-900'>
        <Sidebar className='dark:bg-stone-800'>
          <BigSidebar />
        </Sidebar>
        <SideContent className='dark:bg-stone-900 min-h-screen'>
          <MainNavbar className='dark:bg-stone-800' />
          <main className='dark:bg-stone-900 bg-slate-50 p-4'>
            <Outlet />
          </main>
        </SideContent>
        <SidebarModal>
          <MobileSidebar />
        </SidebarModal>
      </Sheet>
    </PostLayoutProvider>
  );
}
