import { getCurrentUserRequest } from '@/lib/api/user';
import { useUserStore } from '@/lib/store/userStore';
import { useQuery } from '@/hooks';

const useCurrentUser = () => {
  const userStore = useUserStore();

  const { data: user, isLoading } = useQuery(getCurrentUserRequest, {
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

export default useCurrentUser;
