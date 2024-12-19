import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { addEducationRecordRequest } from '../services/userRequests';

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
