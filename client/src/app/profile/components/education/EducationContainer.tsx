import { Modal } from '@/components/ui';
import { useProfileStore } from '@/lib/store/ProfileStore';
import { FaGraduationCap } from 'react-icons/fa';
import { Heading } from '../user_information';
import AddEducation from './AddEducation';
import EditEducation from './EditEducation';
import EducationRecordList from './EducationRecordList';
import { CanAccess } from '@/auth';
import { permissions } from '@/config/permissions';

type Props = {
  className?: string;
};

export default function EducationContainer({ className }: Props) {
  const profileStore = useProfileStore();

  return (
    <section
      className={`bg-white dark:bg-stone-900 w-full rounded-md shadow-md py-4 ${className}`}
    >
      <div className='px-6 py-2 flex justify-between'>
        <Heading icon={<FaGraduationCap />} content='Education' />
        <CanAccess requiredPermissions={[permissions.OTHER_USER_EDIT]}>
          <button
            className='text-blue-600 hover:underline'
            onClick={profileStore.toggleAddEducationModal}
            aria-label='Click to add Education record'
          >
            + Add Education
          </button>
        </CanAccess>
      </div>
      <EducationRecordList />
      {/* adding education modal */}
      <Modal isOpen={profileStore.addEducationModal}>
        <div className='w-[85%] mx-auto max-w-[600px] p-6'>
          <AddEducation />
        </div>
      </Modal>
      {/* Edit education modal */}
      <Modal isOpen={profileStore.editEducationModal}>
        <div className='w-[85%] mx-auto max-w-[600px] p-6'>
          <EditEducation />
        </div>
      </Modal>
    </section>
  );
}
