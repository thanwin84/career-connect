import { Logo } from '@/components/ui';
import { Link } from 'react-router-dom';
import UserDashboardLinks from './UserDashboardLinks';

type Props = {
  className?: string;
};

export default function BigSidebar({ className }: Props) {
  return (
    <section className={`w-full p-4  ${className}`}>
      <Link to='../'>
        <Logo className='w-44 pb-14 pt-4' />
      </Link>
      <UserDashboardLinks className='pt-8' />
    </section>
  );
}
