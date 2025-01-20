import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { FormData } from '../../../types';
import { updateJobRequest } from '../services';

export const useUpdateJob = () => {
  const naviage = useNavigate();
  const { jobId } = useParams();
  const { isPending, mutate: updateJob } = useMutation(
    (formData: FormData) => updateJobRequest(jobId as string, formData),
    {
      onSuccess: () => {
        naviage('../jobs');
        toast.success('Job is updated successfully');
      },
      onError: (error) => {
        toast.error(error?.response?.message);
      },
    }
  );
  return {
    isPending,
    updateJob,
  };
};
