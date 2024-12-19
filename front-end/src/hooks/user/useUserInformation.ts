import { getUserInformationRequest } from '../../services/service';
import { useUserStore } from '../../store/userStore';
import useQuery from '../useQuery';

export const useUserInformation = () => {
  const userStore = useUserStore();

  const { data: user, isLoading } = useQuery(getUserInformationRequest, {
    onSuccess: (data) => {
      userStore.addUser(data.data);
    },
    onError: () => {},
  });

  return {
    user,
    isLoading,
  };
};
