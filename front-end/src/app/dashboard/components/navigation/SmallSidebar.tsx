import { Logo } from '@/components/ui';
import { FaTimes } from 'react-icons/fa';
import UserDashboardLinks from './UserDashboardLinks';
import { TriggerButton } from '@/components/ui/sheet';

type Props = {
  className?: string;
};
export default function SmallSidebar({ className }: Props) {
  return (
    <div className={`w-full bg-white rounded-md dark:bg-zinc-900 ${className}`}>
      <TriggerButton className='text-red-500 hover:text-red-700'>
        <FaTimes size='1.4rem' />
      </TriggerButton>

      <div className='pt-4'>
        <Logo className='w-44 mx-auto' />
      </div>
      <UserDashboardLinks />
    </div>
  );
}
