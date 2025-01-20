import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { FormData } from '../../../types';
import { updateManyJobApplicationStatusRequest } from '../services';

export const useManyJobApplicationStatusUpdate = () => {
  const {
    mutate: updateManyJobApplicationStatus,
    isError,
    isPending,
    error,
    isSuccess,
  } = useMutation(
    (formData: FormData) =>
      updateManyJobApplicationStatusRequest(formData.params, formData.data),
    {
      onSuccess: () => {
        toast.success('Statuses are updated successfully');
      },
      onError: () => {
        toast.error('Failed to update status. Please try again');
      },
    }
  );
  return {
    updateManyJobApplicationStatus,
    isError,
    isPending,
    error,
    isSuccess,
  };
};
