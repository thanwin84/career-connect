import { AddEducation, EducationRecordList, EditEducation } from './index';
import { FaGraduationCap } from 'react-icons/fa';
import { Modal } from '../../../../../components/ui';
import { useProfileStore } from '../../../../../lib/store/ProfileStore';
import { Heading } from '../user_information';

type Props = {
  className?: string;
};

export default function EducationContainer({ className }: Props) {
  const profileStore = useProfileStore();

  return (
    <section
      className={`bg-white dark:bg-black/[0.96] w-full rounded-md shadow-md py-4 ${className}`}
    >
      <div className="px-6 py-2 flex justify-between">
        <Heading icon={<FaGraduationCap />} content="Education" />
        <button
          className="text-blue-600 hover:underline"
          onClick={profileStore.toggleAddEducationModal}
          aria-label="Click to add Education record"
        >
          + Add Education
        </button>
      </div>
      <EducationRecordList />
      {/* adding education modal */}
      <Modal isOpen={profileStore.addEducationModal}>
        <div className="w-[85%] mx-auto max-w-[600px] p-6">
          <AddEducation />
        </div>
      </Modal>
      {/* Edit education modal */}
      <Modal isOpen={profileStore.editEducationModal}>
        <div className="w-[85%] mx-auto max-w-[600px] p-6">
          <EditEducation />
        </div>
      </Modal>
    </section>
  );
}
