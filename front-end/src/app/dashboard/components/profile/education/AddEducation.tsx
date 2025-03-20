import { EducationForm } from '.';
import { useEffect, useState } from 'react';
import ObjectId from 'bson-objectid';
import { useProfileStore } from '../../../../../lib/store/ProfileStore';
import { useUserStore } from '../../../../../lib/store/userStore';
import { useAddEducationRecord } from '../../../hooks/user_profile/useAddEducationRecord';
import { Education } from '../../../../../lib/types/user';
type Props = {
  className?: string;
};
export default function AddEducation({ className }: Props) {
  const { isPending, addEducationRecord, isSuccess } = useAddEducationRecord();
  const profileStore = useProfileStore();
  const userStore = useUserStore();
  const [record, setRecord] = useState<Education>();

  useEffect(() => {
    if (isSuccess && record) {
      userStore.addEducationRecord(record);
      profileStore.toggleAddEducationModal();
    }
  }, [isSuccess]);

  function handleOnSave(formData: Education) {
    const id = new ObjectId().toString();
    const newRecord = { _id: id, ...formData };
    addEducationRecord(newRecord);
    setRecord(newRecord);
  }

  return (
    <EducationForm
      title="Add Education"
      submitButtonText="Create"
      isPending={isPending}
      closeModal={profileStore.toggleAddEducationModal}
      onSave={handleOnSave}
      record={profileStore.selectedEducationRecord as Education}
      className={className}
    />
  );
}
