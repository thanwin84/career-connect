import { FormData } from '../types';
import { customFetch } from '../utils';
export const sendCodeRequest = async (formData: FormData) => {
  try {
    const response = await customFetch.post(
      `/verification/send-verification-code`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const verifyCodeRequest = async (formData: FormData) => {
  try {
    const response = await customFetch.post(
      '/verification/verify-code',
      formData
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
