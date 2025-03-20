import { getUserInformationRequest } from '../../lib/api/user';
import { useUserStore } from '../../lib/store/userStore';
import useQuery from '../useQuery';

export const useUserInformation = () => {
  const userStore = useUserStore();

  const { data: user, isLoading } = useQuery(getUserInformationRequest, {
    onSuccess: (data) => {
      userStore.setLoading(false);
      userStore.addUser(data.data);
    },
    onError: () => {
      userStore.setLoading(false);
    },
  });

  return {
    user,
    isLoading,
  };
};
