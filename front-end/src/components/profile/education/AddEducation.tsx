import { EducationForm } from ".";
import { useAddEducationRecord } from "../../../api/UserApi";
import { Education, FormData } from "../../../types";
import { useEffect, useState } from "react";
import ObjectId from "bson-objectid";
import { useProfileStore } from "../../../store/ProfileStore";
import { useUserStore } from "../../../store/userStore";
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

  function handleOnSave(formData: FormData) {
    const id = new ObjectId().toString();
    const newRecord = { _id: id, ...formData } as Education;
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
