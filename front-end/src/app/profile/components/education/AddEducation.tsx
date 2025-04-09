import { useAddEducationRecord } from '@/hooks/api';
import { useProfileStore } from '@/lib/store/ProfileStore';
import { useUserStore } from '@/lib/store/userStore';
import { Education } from '@/lib/types';
import { useState, useEffect } from 'react';
import EducationForm from './EducationForm';
import { generateId } from '@/utils';

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
    const newRecord = { ...formData, _id: generateId() };
    addEducationRecord(newRecord);
    setRecord(newRecord);
  }

  return (
    <EducationForm
      title='Add Education'
      submitButtonText='Create'
      isPending={isPending}
      closeModal={profileStore.toggleAddEducationModal}
      onSave={handleOnSave}
      record={profileStore.selectedEducationRecord as Education}
      className={className}
    />
  );
}
