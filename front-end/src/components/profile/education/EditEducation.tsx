import { useEffect, useState } from "react";
import { useUpdateEducationRecord } from "../../../api/UserApi";
import { Education, FormData } from "../../../types";

import { EducationForm, DeleteEducationRecord } from "./index";
import { useProfileStore } from "../../../store/ProfileStore";
import { useUserStore } from "../../../store/userStore";

export default function EditEducation() {
  const profileStore = useProfileStore();
  const userStore = useUserStore();
  const [updatedEducation, setUpdatedEducation] = useState<Education>();
  const { isSuccess, isPending, updateEducationRecord } =
    useUpdateEducationRecord();

  useEffect(() => {
    if (isSuccess && updatedEducation) {
      userStore.updateEducationRecord(updatedEducation, updatedEducation._id);
      profileStore.toggleEditEducationModal();
    }
  }, [isSuccess, updatedEducation]);

  function handleOnsave(formData: FormData) {
    updateEducationRecord(formData);
    setUpdatedEducation(formData as Education);
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
