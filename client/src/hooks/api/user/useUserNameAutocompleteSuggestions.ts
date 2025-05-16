import useQuery from '@/hooks/useQuery';
import { UserNameAutocompleteSuggestions } from '@/lib/types';
import { customFetch } from '@/utils';

const getUserNameAutocompleteSuggestionRequest = (
  searchParams: string
): Promise<UserNameAutocompleteSuggestions> =>
  customFetch.get(`/users/search?search=${searchParams}`);

export const useUserNameAutocompleteSuggestions = () => {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    refetch: searchUsers,
  } = useQuery((search: string | undefined) =>
    getUserNameAutocompleteSuggestionRequest(search || '')
  );
  return {
    data,
    searchUsers,
    isError,
    isLoading,
    isSuccess,
  };
};
