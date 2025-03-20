import { customFetch } from '../../utils';
import { FormData } from '../types/common';

export const reEnterPasswordRequest = async (formData: FormData) =>
  await customFetch.post('/account-setting/re-enter-password', formData);
export const deleteAccountRequest = async () =>
  await customFetch.delete('/account-setting/delete-account');

export const changePasswordRequest = async (formData: FormData) => {
  try {
    await customFetch.patch('/account-setting/change-password', formData);
  } catch (error) {
    throw error;
  }
};
export const toggleTwoStepAuthRequest = async (formData: FormData) => {
  try {
    await customFetch.post('/account-setting/re-enter-password', formData);
    await customFetch.patch('/account-setting/toggle-two-step-authentication');
  } catch (error) {
    throw error;
  }
};
