import { EducationForm } from ".";
import { useAddEducationRecord } from "../../../api/UserApi";
import { useAppContext } from "../../../contexts/AppProvider";
import { Education, FormData } from "../../../types";
import { useEffect, useState } from "react";
import ObjectId from "bson-objectid";
type Props = {
  className?: string;
};
export default function AddEducation({ className }: Props) {
  const { isPending, addEducationRecord, isSuccess } = useAddEducationRecord();
  const {
    profileStore: {
      state: { selectedEducationRecord },
      actions,
    },
    userStore: { actions: userActions },
  } = useAppContext();
  const [record, setRecord] = useState<Education>();

  useEffect(() => {
    if (isSuccess && record) {
      userActions.addEducationRecord(record);
      actions.toggleAddEducationModal();
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
      closeModal={actions.toggleAddEducationModal}
      onSave={handleOnSave}
      record={selectedEducationRecord as Education}
      className={className}
    />
  );
}
