import { toast } from 'react-toastify';
import { useMutation } from '../../../../hooks';
import { useProfileStore } from '../../../../lib/store/ProfileStore';
import { updateEducationRecordRequest } from '../../../../lib/api/user';
import { FormData } from '../../../../lib/types/common';

export const useUpdateEducationRecord = () => {
  const profileStore = useProfileStore();
  let id = '';
  const education = profileStore.selectedEducationRecord;
  if (education !== null) {
    const { _id } = education;
    id = _id as string;
  }
  const {
    mutate: updateEducationRecord,
    isPending,
    isSuccess,
    resetState,
  } = useMutation(
    (formData: FormData) => updateEducationRecordRequest(formData, id),
    {
      onSuccess: () => {
        toast.success('Education record is updated successfully.');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data.message);
      },
    }
  );
  return {
    updateEducationRecord,
    isPending,
    isSuccess,
    resetState,
  };
};
