import { toast } from 'react-toastify';
import { addPhoneNumberRequest } from '@/lib/api';
import useMutation from '@/hooks/useMutation';

const useAddPhoneNumber = () => {
  const {
    mutate: addPhoneNumber,
    isPending,
    isSuccess,
    resetState,
  } = useMutation(addPhoneNumberRequest, {
    onSuccess: () => {
      toast.success('Phone number is added successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
    },
  });
  return {
    addPhoneNumber,
    isPending,
    isSuccess,
    resetState,
  };
};

export default useAddPhoneNumber;
