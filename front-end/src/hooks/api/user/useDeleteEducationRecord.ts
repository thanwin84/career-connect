import { useMutation } from '@/hooks';
import { deleteEducationRecordRequest } from '@/lib/api';
import { useProfileStore } from '@/lib/store/ProfileStore';
import { toast } from 'react-toastify';

export const useDeleteEducationRecord = () => {
  const profileStore = useProfileStore();
  let id = '';
  const education = profileStore.selectedEducationRecord;
  if (education !== null) {
    const { _id } = education;
    id = _id as string;
  }
  const {
    mutate: deleteEducationRecord,
    isPending,
    isSuccess,
    resetState,
  } = useMutation(() => deleteEducationRecordRequest(id), {
    onSuccess: () => {
      toast.success('Education is deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    deleteEducationRecord,
    isPending,
    isSuccess,
    resetState,
  };
};
