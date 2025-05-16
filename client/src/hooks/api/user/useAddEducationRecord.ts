import { useMutation } from '@/hooks';
import { addEducationRecordRequest } from '@/lib/api';
import { EducationFormType } from '@/lib/schemas';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useAddEducationRecord = () => {
  const { userId } = useParams();
  const {
    mutate: addEducationRecord,
    isPending,
    isSuccess,
    resetState,
  } = useMutation(
    (formData: EducationFormType) =>
      addEducationRecordRequest(formData, userId as string),
    {
      onSuccess: () => {
        toast.success('Education record is added successfully');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data.message);
      },
    }
  );
  return {
    addEducationRecord,
    isPending,
    isSuccess,
    resetState,
  };
};
