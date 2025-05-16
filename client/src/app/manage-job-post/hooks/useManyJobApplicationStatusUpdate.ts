import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { updateManyJobApplicationStatusRequest } from '../../../lib/api/job';
import { BulkJobApplicationStatusUpdateType } from '../../../lib/types';

export const useManyJobApplicationStatusUpdate = () => {
  const {
    mutate: updateManyJobApplicationStatus,
    isError,
    isPending,
    error,
    isSuccess,
  } = useMutation(
    (formData: BulkJobApplicationStatusUpdateType) =>
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
