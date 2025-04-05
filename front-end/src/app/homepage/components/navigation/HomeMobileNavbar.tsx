import { SlideOpen } from '@/components/ui';
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import HomeMobileNavbarLinks from './HomeMobileNavbarLinks';

type Props = {
  className?: string;
};
export default function HomeMobileNavbar({ className }: Props) {
  const [openMobileSideBar, setOpenMobileSideBar] = useState(false);
  function toggleMobileSideBar() {
    setOpenMobileSideBar(!openMobileSideBar);
  }

  return (
    <div className={`dark:bg-zinc-800 ${className}`}>
      <button
        onClick={toggleMobileSideBar}
        className='my-auto text-3xl text-blue-500'
      >
        <IoMenu />
      </button>

      <SlideOpen
        closeFn={toggleMobileSideBar}
        isOpen={openMobileSideBar}
        position='left'
        className='w-3/6'
      >
        {<HomeMobileNavbarLinks closeFn={toggleMobileSideBar} />}
      </SlideOpen>
    </div>
  );
}
