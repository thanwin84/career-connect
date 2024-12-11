import { BigSidebar } from "../../components/dashboardNavigations";
import MobileSideBarModal from "../../components/dashboardNavigations/MobileSideBarModal";
import { useDashboardContext } from "../../contexts/dashboardContext";
import { useWindowScreenSize } from "../../hooks";
import DashboardMainContent from "./MainContent";

export default function LayoutContent() {
  const currentSize = useWindowScreenSize();
  const { showBigSidebar } = useDashboardContext();
  const rightShift = showBigSidebar && currentSize !== "sm";
  return (
    <div className="flex flex-row ">
      <BigSidebar className="fixed" />
      <DashboardMainContent className={`${rightShift ? "ml-52" : ""}`} />
      <MobileSideBarModal />
    </div>
  );
}
