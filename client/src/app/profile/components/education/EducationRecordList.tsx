import { useUserStore } from '@/lib/store/userStore';
import EducationInfo from './EducationInfo';

type Props = {
  className?: string;
};
export default function EducationRecordList({ className }: Props) {
  const userStore = useUserStore();
  const educationLen =
    userStore.currentSelectedUser?.educationRecords?.length || 0;

  if (
    userStore.currentSelectedUser &&
    userStore.currentSelectedUser.educationRecords &&
    userStore.currentSelectedUser.educationRecords.length === 0
  ) {
    return (
      <div className='py-4'>
        <p className='text-base text-center text-slate-500 dark:text-slate-400'>
          Click{' '}
          <span className='text-blue-600 font-semibold'>Add Education</span>{' '}
          button to add your Education information
        </p>
      </div>
    );
  }
  return (
    <div className={`px-6 py-4 ${className}`}>
      {userStore.currentSelectedUser &&
        userStore.currentSelectedUser?.educationRecords?.map(
          (record, index) => (
            <EducationInfo
              key={record._id}
              record={record}
              className={`${
                educationLen - 1 != index ? 'border-b border-slate-300' : ''
              }`}
            />
          )
        )}
    </div>
  );
}
