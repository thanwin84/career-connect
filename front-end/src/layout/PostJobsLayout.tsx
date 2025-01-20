import { Outlet } from 'react-router-dom';
import BigSidebar from '../features/navigations/components/post-jobs/BigSidebar';
import MainNavbar from '../features/navigations/components/post-jobs/MainNavbar';
import { useWindowScreenSize } from '../hooks';
import {
  PostLayoutProvider,
  usePostLayoutContext,
} from '../contexts/postLayoutContext';
import MobileSidebar from '../features/navigations/components/post-jobs/MobileSideBar';
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
        <main className="dark:bg-zinc-700 bg-slate-50 p-4">
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
