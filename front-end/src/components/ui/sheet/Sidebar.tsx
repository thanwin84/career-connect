import { AnimatePresence, motion } from 'motion/react';
import { useSheetContext } from './Sheet';
import { ReactNode } from 'react';
import { useWindowScreenSize } from '@/hooks';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function Sidebar({ className, children }: Props) {
  const { showBigSidebar } = useSheetContext();
  const currentSize = useWindowScreenSize();
  const w = ['2xl', 'xl'].includes(currentSize)
    ? '16%'
    : ['lg'].includes(currentSize)
    ? '25%'
    : 0;
  console.log(currentSize);
  if (currentSize === 'md' || currentSize === 'xs' || currentSize === 'sm') {
    return null;
  }
  return (
    <AnimatePresence>
      {showBigSidebar && (
        <motion.aside
          key='big-sidebar'
          initial={{ x: -200, opacity: 1, width: 0 }}
          animate={{ x: 0, opacity: 1, width: w }}
          exit={{ x: -200, opacity: 0, width: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed   border-r w-[30%] dark:border-none dark:bg-black/[0.96] h-screen ${className}`}
        >
          {children}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
