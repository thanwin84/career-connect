import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { createJobRequest } from '../../../lib/api/job';

export const useCreateJob = () => {
  const navigate = useNavigate();

  const { mutate: createJob, isPending } = useMutation(createJobRequest, {
    onSuccess: () => {
      navigate('/post-jobs/jobs');
      toast.success('Job has been created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.message);
    },
  });

  return {
    createJob,
    isPending,
  };
};
