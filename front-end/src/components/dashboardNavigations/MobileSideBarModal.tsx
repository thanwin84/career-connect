import { useDashboardContext } from "../../contexts/dashboardContext";
import { useWindowScreenSize } from "../../hooks";
import { Modal } from "../ui";
import SmallSidebar from "./SmallSidebar";

type Props = {
  className?: string;
};

export default function MobileSideBarModal({}: Props) {
  const { showSmallSidebar, toggleSmallSidebar } = useDashboardContext();
  const currentSize = useWindowScreenSize();
  if (currentSize !== "sm") {
    return null;
  }
  return (
    <Modal isOpen={showSmallSidebar} className="p-6">
      <SmallSidebar onClick={toggleSmallSidebar} />
    </Modal>
  );
}
