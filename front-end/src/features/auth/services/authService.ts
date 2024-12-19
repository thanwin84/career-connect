import { multipartConfig } from '../../../app/config';
import { FormData } from '../../../types';
import { customFetch, extractDataFromResponse } from '../../../utils';
import { LoginResponse, LogoutResponse, RegisterResponse } from '../types';

export const loginRequest = (formData: FormData): Promise<LoginResponse> =>
  customFetch.post('/auth/login', formData).then(extractDataFromResponse);

export const registerUserRequest = (
  userData: FormData
): Promise<RegisterResponse> =>
  customFetch
    .post('/auth/register', userData, {
      headers: multipartConfig,
    })
    .then(extractDataFromResponse);

export const logoutUserRequest = (): Promise<LogoutResponse> =>
  customFetch.get('/auth/logout').then(extractDataFromResponse);
