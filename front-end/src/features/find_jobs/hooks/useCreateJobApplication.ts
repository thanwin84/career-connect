import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { createJobApplicationRequest } from '../services/jobApplicationService';

export const useCreateJobApplication = () => {
  const {
    mutate: createJobApplication,
    isPending,
    isSuccess,
    resetState,
    isError,
    error,
  } = useMutation(createJobApplicationRequest, {
    onSuccess: () => {
      toast.success("You've applied successfully");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
  return {
    createJobApplication,
    isPending,
    isSuccess,
    resetState,
    isError,
    error,
  };
};
