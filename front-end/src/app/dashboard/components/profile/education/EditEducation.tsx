import { useEffect, useState } from 'react';

import { EducationForm, DeleteEducationRecord } from './index';
import { useProfileStore } from '../../../../../lib/store/ProfileStore';
import { useUserStore } from '../../../../../lib/store/userStore';
import { useUpdateEducationRecord } from '../../../hooks/user_profile/useUpdateEducationRecord';
import { Education } from '../../../../../lib/types/user';

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
    <div className="relative">
      <EducationForm
        title="Edit Education"
        record={profileStore.selectedEducationRecord as Education}
        isPending={isPending}
        closeModal={profileStore.toggleEditEducationModal}
        onSave={handleOnsave}
        submitButtonText="Save Changes"
        id="edit-education-id"
      />
      <DeleteEducationRecord
        className="absolute bottom-6 left-8"
        closeModal={profileStore.toggleEditEducationModal}
      />
    </div>
  );
}
