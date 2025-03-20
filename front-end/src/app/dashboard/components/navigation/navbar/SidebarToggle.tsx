import { FaAlignLeft } from 'react-icons/fa';
import { useDashboardContext } from '../../../../../contexts/dashboardContext';
import { useWindowScreenSize } from '../../../../../hooks';

type Props = {
  className?: string;
};

export default function SidebardToggle({ className }: Props) {
  const { toggleBigSidebar, toggleSmallSidebar } = useDashboardContext();
  const currentSize = useWindowScreenSize();
  const isSmallSidebar = currentSize === 'sm';
  return (
    <button
      onClick={isSmallSidebar ? toggleSmallSidebar : toggleBigSidebar}
      className={`text-blue-600 ml-4 ${className}`}
    >
      <FaAlignLeft size="1.8rem" />
    </button>
  );
}
