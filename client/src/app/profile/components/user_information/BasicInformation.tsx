import { CgProfile } from 'react-icons/cg';
import { User } from '@/lib/types';
import BasicInfo from './BasicInfo';
import Heading from './Heading';
import EditButton from '@/components/ui/EditButton';
import { CanAccess } from '@/auth';
import { permissions } from '@/config/permissions';
import { useProfileStore } from '@/lib/store/ProfileStore';

type Props = {
  className?: string;
  user: User;
};

export default function BasicInformation({ user, className }: Props) {
  const { email, location, role, phoneNumber } = user;
  const { toggleEditUserModal } = useProfileStore();
  return (
    <section
      className={`bg-white dark:bg-stone-900 w-full rounded-md shadow-md px-8 py-6 ${className}`}
    >
      <div className='flex  justify-between mb-4'>
        <Heading icon={<CgProfile />} content='Basic Information' />
        <CanAccess requiredPermissions={[permissions.OTHER_USER_EDIT]}>
          <EditButton onClick={toggleEditUserModal} />
        </CanAccess>
      </div>
      <div className='grid grid-cols-2 py-2 gap-4'>
        <BasicInfo label='Email' text={email} />
        <BasicInfo label='Gender' text='Male' />

        <BasicInfo
          label='Phone Number'
          text={phoneNumber ? phoneNumber : 'Not Present'}
        />
        <BasicInfo label='City' text={location.city as string} />
        <BasicInfo label='Country' text={location.country as string} />
        <div>
          <p className='text-slate-700 font-semibold dark:text-slate-300'>
            Roles
          </p>
          <ul className='flex gap-2 dark:text-slate-300'>
            {role.map((item) => (
              <li className='text-slate-700 dark:text-slate-200'>
                {item.role.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
