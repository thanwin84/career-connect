import { UniversityIcon } from '@/assets/icons/Icons';
import { CanAccess } from '@/auth';
import EditButton from '@/components/ui/EditButton';
import { permissions } from '@/config/permissions';
import { useProfileStore } from '@/lib/store/ProfileStore';
import { Education } from '@/lib/types';

type Props = {
  record: Education;
  className?: string;
};

export default function EducationInfo({ record, className }: Props) {
  const profileStore = useProfileStore();

  function handleClick() {
    profileStore.handleSetEducationRecord(record);
    profileStore.toggleEditEducationModal();
  }
  return (
    <div className={`py-4 flex gap-2 ${className}`}>
      <div className='my-auto text-slate-600 dark:text-slate-300'>
        <UniversityIcon size='1.6rem' />
      </div>
      <div className='w-full'>
        <h3 className='font-bold text-slate-800 dark:text-slate-200 text-base'>
          {record.school}
        </h3>
        <div className='w-full flex justify-between'>
          <p className='text-sm text-slate-700 dark:text-slate-300'>
            <span>{record.department}</span>
            <span className='font-bold dark:text-slate-200'> . </span>
            <span>{record.degree}</span>
            <span className='font-bold dark:text-slate-200'> . </span>
            <span>
              {record.startMonth} {record.startYear}
            </span>
            <span className='font-bold'> - </span>
            <span>
              {record.currentlyStudying
                ? 'present'
                : `${record.endMonth} ${record.endYear}`}
            </span>
          </p>

          <CanAccess requiredPermissions={[permissions.OTHER_USER_EDIT]}>
            <EditButton onClick={handleClick} />
          </CanAccess>
        </div>
      </div>
    </div>
  );
}
