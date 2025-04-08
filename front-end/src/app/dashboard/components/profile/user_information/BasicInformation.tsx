import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { User } from '@/lib/types';
import BasicInfo from './BasicInfo';
import Heading from './Heading';
import EditButton from '@/components/ui/EditButton';

type Props = {
  className?: string;
  user: User;
};

export default function BasicInformation({ user, className }: Props) {
  const { email, location, role, phoneNumber } = user;
  const navigate = useNavigate();
  return (
    <section
      className={`bg-white dark:bg-stone-800 w-full rounded-md shadow-md px-8 py-6 ${className}`}
    >
      <div className='flex justify-between mb-4'>
        <Heading icon={<CgProfile />} content='Basic Information' />

        <EditButton onClick={() => navigate('../profile/edit')} />
      </div>
      <div className='grid grid-cols-2 py-2 gap-2'>
        <BasicInfo label='Email' text={email} />
        <BasicInfo label='Gender' text='Male' />
        <BasicInfo
          label='Phone Number'
          text={phoneNumber ? phoneNumber : 'Not Present'}
        />
        <BasicInfo label='Location' text={location.city as string} />
        <BasicInfo label='User role' text={role[0].role as string} />
      </div>
    </section>
  );
}
