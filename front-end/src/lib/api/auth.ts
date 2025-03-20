import { multipartConfig } from '../../config';
import { customFetch, extractDataFromResponse } from '../../utils';
import { LoginResponse, RegisterResponse, LogoutResponse } from '../types/auth';
import { FormData } from '../types/common';

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
