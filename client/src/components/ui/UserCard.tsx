import { RxAvatar } from 'react-icons/rx';
import { Public_User } from '@/lib/types';
type Props = {
  className?: string;
  user: Public_User;
};

export default function UserCard({ className, user }: Props) {
  return (
    <div
      className={`flex px-2 py-1 border border-slate-200 shadow-sm dark:border-slate-500 rounded-md ${className}`}
    >
      <div className='w-10 h-10 my-auto'>
        {user?.avatar ? (
          <img
            className='w-full h-full rounded-full object-cover'
            src={user?.avatar?.url || ''}
            alt='recruiter profile'
          />
        ) : (
          <RxAvatar />
        )}
      </div>
      <div className='flex flex-col gap-1 ml-4'>
        <p className='font-semibold dark:text-slate-200 text-slate-800'>
          {user?.firstName}
        </p>
        <p className='text-slate-700 dark:text-slate-200'>
          <span>HR Manager</span>
          <span className='ml-4'>X company</span>
        </p>
      </div>
    </div>
  );
}
