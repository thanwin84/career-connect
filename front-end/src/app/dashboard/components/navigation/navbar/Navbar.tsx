import { Logo } from '@/components/ui';
import { Link } from 'react-router-dom';
import NavbarActions from './NavbarActions';
import { TriggerButton } from '@/components/ui/sheet';
import { FaAlignLeft } from 'react-icons/fa';

export default function Navbar({ className }: { className?: string }) {
  return (
    <nav
      className={`w-full flex justify-between px-4 py-4 shadow-sm  border-b dark:border-none ${className}`}
    >
      <TriggerButton className='text-blue-400 hover:text-blue-600'>
        <FaAlignLeft size={20} />
      </TriggerButton>
      <div>
        <Logo className='lg:hidden w-36' />
        <h1 className='hidden lg:block text-2xl text-slate-700 font-semibold dark:text-white'>
          Dashboard
        </h1>
      </div>
      <div className='flex gap-3'>
        <NavbarActions />
        <div className='border-l h-8 my-auto' />
        <Link
          className='px-4 py-2 dark:text-slate-200 my-auto hover:border-b hover:border-b-blue-500 hover:text-blue-700  font-semibold'
          to={'/post-jobs'}
        >
          Post Job
        </Link>
      </div>
    </nav>
  );
}
