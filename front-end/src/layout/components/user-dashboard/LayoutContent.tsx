import { useDashboardContext } from '../../../contexts/dashboardContext';
import { BigSidebar } from '../../../features/navigations/components/dashboardNavigations';
import MobileSideBarModal from '../../../features/navigations/components/dashboardNavigations/MobileSideBarModal';
import { useWindowScreenSize } from '../../../hooks';
import DashboardMainContent from './MainContent';

export default function LayoutContent() {
  const currentSize = useWindowScreenSize();
  const { showBigSidebar } = useDashboardContext();
  const rightShift = showBigSidebar && currentSize !== 'sm';
  return (
    <div className="flex flex-row ">
      <BigSidebar className="fixed" />
      <DashboardMainContent className={`${rightShift ? 'ml-52' : ''}`} />
      <MobileSideBarModal />
    </div>
  );
}
