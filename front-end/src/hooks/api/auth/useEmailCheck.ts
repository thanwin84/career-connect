import { useDebounce, useMutation } from '@/hooks';
import { customFetch } from '@/utils';
import { useEffect } from 'react';

export const useEmailCheck = (email: string) => {
  const { data, mutate: checkIfEmailExists } = useMutation((email: string) =>
    customFetch.post('/auth/check-email', { email })
  );
  const debounce = useDebounce(500);
  useEffect(() => {
    if (email) {
      debounce(() => checkIfEmailExists(email));
    }
  }, [email]);
  return data?.data.exists;
};
