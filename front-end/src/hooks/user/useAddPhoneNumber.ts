import { toast } from 'react-toastify';

import useMutation from '../useMutation';
import { addPhoneNumberRequest } from '../../lib/api/user';

export const useAddPhoneNumber = () => {
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
