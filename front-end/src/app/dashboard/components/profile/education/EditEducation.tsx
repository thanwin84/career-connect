import { useUpdateEducationRecord } from '@/hooks/api/user/useUpdateEducationRecord';
import { useProfileStore } from '@/lib/store/ProfileStore';
import { useUserStore } from '@/lib/store/userStore';
import { Education } from '@/lib/types';
import { useEffect, useState } from 'react';
import DeleteEducationRecord from './DeleteEducationRecord';
import EducationForm from './EducationForm';

export default function EditEducation() {
  const profileStore = useProfileStore();
  const userStore = useUserStore();
  const [updatedEducation, setUpdatedEducation] = useState<Education>();
  const { isSuccess, isPending, updateEducationRecord } =
    useUpdateEducationRecord();

  useEffect(() => {
    if (isSuccess && updatedEducation) {
      userStore.updateEducationRecord(
        updatedEducation,
        updatedEducation._id as string
      );
      profileStore.toggleEditEducationModal();
    }
  }, [isSuccess, updatedEducation]);

  function handleOnsave(formData: Education) {
    updateEducationRecord(formData);
    setUpdatedEducation(formData);
  }

  return (
    <div className='relative bg-white dark:bg-stone-800 px-4 rounded-md py-6'>
      <EducationForm
        title='Edit Education'
        record={profileStore.selectedEducationRecord as Education}
        isPending={isPending}
        closeModal={profileStore.toggleEditEducationModal}
        onSave={handleOnsave}
        submitButtonText='Save Changes'
        id='edit-education-id'
      />
      <DeleteEducationRecord
        className='w-full px-6'
        closeModal={profileStore.toggleEditEducationModal}
      />
    </div>
  );
}
