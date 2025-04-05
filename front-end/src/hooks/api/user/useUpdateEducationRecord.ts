import { useMutation } from '@/hooks';
import { updateEducationRecordRequest } from '@/lib/api';
import { EducationFormType } from '@/lib/schemas';
import { useProfileStore } from '@/lib/store/ProfileStore';
import { toast } from 'react-toastify';

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
    (formData: EducationFormType) => updateEducationRecordRequest(formData, id),
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
