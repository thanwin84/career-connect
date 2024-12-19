import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '../../../hooks';
import { deleteAccountRequest } from '../services/setting.service';

export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const { mutate: deleteAccount, isPending } = useMutation(
    deleteAccountRequest,
    {
      onSuccess: () => {
        toast.success('You have successfully deleted your acount');
        navigate('/login');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data.message);
      },
    }
  );

  return {
    deleteAccount,
    isPending,
  };
};
