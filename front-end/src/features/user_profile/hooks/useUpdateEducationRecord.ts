import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { useProfileStore } from '../../../store/ProfileStore';
import { updateEducationRecordRequest } from '../services/userRequests';
import { FormData } from '../../../types';

export const useUpdateEducationRecord = () => {
  const profileStore = useProfileStore();
  let id = '';
  const education = profileStore.selectedEducationRecord;
  if (education !== null) {
    const { _id } = education;
    id = _id;
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
