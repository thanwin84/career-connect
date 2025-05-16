import { AnimatePresence, motion } from 'motion/react';
import { useSheetContext } from './Sheet';
import { useWindowScreenSize } from '@/hooks';
import { ReactNode, useRef } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function SidebarModal({ className, children }: Props) {
  const { showSmallSidebar, toggleOpen } = useSheetContext();
  const currentSize = useWindowScreenSize();
  const ref = useRef<HTMLDivElement>(null);

  return currentSize === 'md' || currentSize === 'sm' ? (
    <AnimatePresence>
      {showSmallSidebar && (
        <div
          onClick={toggleOpen}
          className='fixed inset-0 bg-black/50 flex justify-center items-center'
        >
          <motion.div
            ref={ref}
            key='modal'
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            // it prevents the click event from bubbling up to the parent element
            // which would close the modal when clicking inside it
            onClick={(e) => e.stopPropagation()}
            className={`w-[60%] h-[70%] bg-white rounded-md shadow-lg ${className}`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  ) : null;
}
