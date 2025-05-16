import { AnimatePresence, motion } from 'motion/react';
import { ReactNode } from 'react';
import { useSheetContext } from './Sheet';
import { useWindowScreenSize } from '@/hooks';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function SideContent({ className, children }: Props) {
  const { showBigSidebar, isCollapsed } = useSheetContext();
  const currentSize = useWindowScreenSize();
  const ml = ['2xl', 'xl'].includes(currentSize)
    ? '16%'
    : ['lg'].includes(currentSize)
    ? '25%'
    : 0;
  const _ml = isCollapsed ? '6%' : ml;
  return (
    <AnimatePresence>
      <motion.div
        animate={{
          marginLeft: showBigSidebar ? _ml : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`flex-1  ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
