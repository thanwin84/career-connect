import { FaTimes } from 'react-icons/fa';

import UserDashboardLinks from './UserDashboardLinks';
import { Logo } from '../../../../components/ui';

type Props = {
  className?: string;
  onClick: () => void;
};
export default function SmallSidebar({ className, onClick }: Props) {
  return (
    <div className={`bg-white p-6 rounded-md dark:bg-zinc-900 ${className}`}>
      <button onClick={onClick} className="text-red-500 hover:text-red-700">
        <FaTimes size="1.4rem" />
      </button>
      <div className="pt-4">
        <Logo className="w-44 mx-auto" />
      </div>
      <div className="py-20 px-8">
        <UserDashboardLinks isSmallSidebar={true} />
      </div>
    </div>
  );
}
