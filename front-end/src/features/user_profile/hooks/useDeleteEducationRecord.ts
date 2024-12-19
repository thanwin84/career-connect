import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { useProfileStore } from '../../../store/ProfileStore';
import { deleteEducationRecordRequest } from '../services/userRequests';

export const useDeleteEducationRecord = () => {
  const profileStore = useProfileStore();
  let id = '';
  const education = profileStore.selectedEducationRecord;
  if (education !== null) {
    const { _id } = education;
    id = _id;
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
