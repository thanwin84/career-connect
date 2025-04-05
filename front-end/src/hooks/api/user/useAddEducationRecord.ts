import { useMutation } from '@/hooks';
import { addEducationRecordRequest } from '@/lib/api';
import { toast } from 'react-toastify';

export const useAddEducationRecord = () => {
  const {
    mutate: addEducationRecord,
    isPending,
    isSuccess,
    resetState,
  } = useMutation(addEducationRecordRequest, {
    onSuccess: () => {
      toast.success('Education record is added successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    addEducationRecord,
    isPending,
    isSuccess,
    resetState,
  };
};
