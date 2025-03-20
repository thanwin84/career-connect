import { Outlet } from 'react-router-dom';
import BigSidebar from '../app/manage-job-post/components/navigation/BigSidebar';
import MainNavbar from '../app/manage-job-post/components/navigation/MainNavbar';
import { useWindowScreenSize } from '../hooks';
import {
  PostLayoutProvider,
  usePostLayoutContext,
} from '../app/manage-job-post/context/postLayoutContext';
import MobileSidebar from '../app/manage-job-post/components/navigation/MobileSideBar';
import { SlideOpen } from '../components/ui';

type Props = {
  className?: string;
};

export default function PostJobsLayout({}: Props) {
  return (
    <PostLayoutProvider>
      <LayoutContent />
    </PostLayoutProvider>
  );
}

function LayoutContent() {
  const currentSize = useWindowScreenSize();
  const showBigSidebar = currentSize === 'md' || currentSize === 'sm';
  const { collapsed, showSmallSidebar, toggleSmallSidebar } =
    usePostLayoutContext();
  return (
    <div className="flex">
      <BigSidebar
        className={`sticky top-0 h-screen  ${
          showBigSidebar
            ? 'hidden'
            : collapsed
            ? 'w-[6%]'
            : 'w-[16%] min-w-[200px]'
        } `}
      />
      <section className={`flex-1`}>
        <MainNavbar />
        <main className="dark:bg-zinc-900 bg-slate-50 p-4">
          <Outlet />
        </main>
      </section>
      <SlideOpen
        position="left"
        closeFn={toggleSmallSidebar}
        isOpen={showSmallSidebar}
        className=""
      >
        <MobileSidebar />
      </SlideOpen>
    </div>
  );
}
