import { User } from '@/lib/types';
import AvatarWithEdit from './AvatarWithEdit';
type Props = {
  className?: string;
  user: User;
};
const url =
  'https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
export default function ProfileHeader({ user, className }: Props) {
  return (
    <div className={` relative  ${className}`}>
      <div className='w-[95%] md:w-[80%] mx-auto h-48'>
        {' '}
        {/* Fixed height */}
        <img
          className='w-full h-full object-cover rounded-md'
          src={url}
          alt='cover photo'
        />
      </div>
      <div className='flex absolute gap-4 left-2 md:left-8 -bottom-14'>
        <AvatarWithEdit avatarUrl={user?.avatar?.url as string} />
        <div className='flex flex-col justify-end'>
          <p className='text-lg uppercase font-semibold text-slate-800 dark:text-slate-200'>
            {user.firstName} {user.lastName}
          </p>
          <p className='text-slate-700 dark:text-slate-300'>Your title</p>
        </div>
      </div>
    </div>
  );
}
