import { multipartConfig } from '@/config';
import { LoginResponse, LogoutResponse, RegisterResponse } from '@/lib/types';
import { customFetch } from '@/utils';
import { UserFormType } from '@/lib/schemas';

export const loginRequest = (
  formData: Pick<UserFormType, 'email' | 'password'>
): Promise<LoginResponse> => customFetch.post('/auth/login', formData);
export const registerUserRequest = (
  userData: FormData
): Promise<RegisterResponse> =>
  customFetch.post('/auth/register', userData, {
    headers: multipartConfig,
  });

export const logoutUserRequest = (): Promise<LogoutResponse> =>
  customFetch.get('/auth/logout');
