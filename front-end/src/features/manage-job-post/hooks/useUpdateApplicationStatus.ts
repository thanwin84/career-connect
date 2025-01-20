import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { FormData } from '../../../types';
import { updateJobApplicationStatus } from '../services';

export const useUpdateApplicationStatus = () => {
  const { mutate, isPending, isSuccess, isError } = useMutation(
    (data: FormData) =>
      updateJobApplicationStatus(data.applicationId, data.data),
    {
      onSuccess: () => {
        toast.success('Application status updated successfully');
      },
      onError: (error) => {
        console.log(error);
        toast.error('Failed to update application status');
      },
    }
  );
  return {
    updateApplicationStatus: mutate,
    isPending,
    isSuccess,
    isError,
  };
};
