import { useMutation } from '@/hooks';
import { updateJobApplicationStatus } from '@/lib/api';
import { JobStatus } from '@/lib/types';
import { toast } from 'react-toastify';

export type UpdatateApplicationStatusType = {
  applicationId: string;
  data: {
    status: JobStatus;
  };
};

export const useUpdateApplicationStatus = () => {
  const { mutate, isPending, isSuccess, isError } = useMutation(
    (data: UpdatateApplicationStatusType) =>
      updateJobApplicationStatus({
        applicationId: data.applicationId,
        data: data.data,
      }),
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
