import { customFetch } from '@/utils';
import { ChangePasswordFormType } from '@/lib/schemas';

export const reEnterPasswordRequest = async (formData: { password: string }) =>
  await customFetch.post('/account-setting/re-enter-password', formData);
export const deleteAccountRequest = async () =>
  await customFetch.delete('/account-setting/delete-account');

export const changePasswordRequest = (formData: ChangePasswordFormType) =>
  customFetch.patch('/account-setting/change-password', formData);

export const toggleTwoStepAuthRequest = async (formData: {
  password: string;
}) => {
  await customFetch.post('/account-setting/re-enter-password', formData);
  await customFetch.patch('/account-setting/toggle-two-step-authentication');
};
