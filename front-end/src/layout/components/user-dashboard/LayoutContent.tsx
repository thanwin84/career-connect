import { motion } from 'motion/react';
import { useDashboardContext } from '../../../contexts/dashboardContext';
import { BigSidebar } from '../../../app/dashboard/components/navigation';
import MobileSideBarModal from '../../../app/dashboard/components/navigation/MobileSideBarModal';
import { useWindowScreenSize } from '../../../hooks';
import DashboardMainContent from './MainContent';

export default function LayoutContent() {
  const currentSize = useWindowScreenSize();
  const { showBigSidebar } = useDashboardContext();
  const rightShift = showBigSidebar && currentSize !== 'sm';
  return (
    <div className="flex flex-row bg-slate-50 dark:bg-black/[0.96] ">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <BigSidebar className="bg-white  fixed" />
      </motion.div>
      <motion.div
        animate={{
          marginLeft: rightShift ? 208 : 0, // 52px * 4 = 208px (equivalent to `ml-52`)
        }}
        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0 }}
        className="flex-1"
      >
        <DashboardMainContent />
      </motion.div>
      <MobileSideBarModal />
    </div>
  );
}
