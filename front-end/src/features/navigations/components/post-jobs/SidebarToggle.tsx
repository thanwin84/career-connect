import { FaAlignLeft } from 'react-icons/fa';
import { usePostLayoutContext } from '../../../../contexts/postLayoutContext';
type Props = {
  className?: string;
};

export default function SidebarToggle({ className }: Props) {
  const { toggleSmallSidebar } = usePostLayoutContext();
  return (
    <button onClick={toggleSmallSidebar} className={` ${className}`}>
      <FaAlignLeft />
    </button>
  );
}