import { useEffect } from 'react';
import { useDebounce, useMutation } from '../../../hooks';
import { BaseApiReponse } from '../../../lib/types/common';
import { customFetch } from '../../../utils';

export const useEmailCheck = (email: string) => {
  const { data, mutate: checkIfEmailExists } = useMutation((email: string) =>
    customFetch
      .post('/auth/check-email', { email })
      .then((res) => res.data as BaseApiReponse<{ exists: boolean }>)
  );
  const debounce = useDebounce(500);
  useEffect(() => {
    if (email) {
      debounce(() => checkIfEmailExists(email));
    }
  }, [email]);
  return data?.data.exists;
};
