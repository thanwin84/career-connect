import { multipartConfig } from '@/config';
import { EducationFormType } from '@/lib/schemas';
import { BaseApiReponse, User } from '@/lib/types';
import { customFetch } from '@/utils';

export const getCurrentUserRequest = (): Promise<BaseApiReponse<User>> =>
  customFetch.get('/users/current-user');

export const addPhoneNumberRequest = (formData: { phoneNumber: string }) =>
  customFetch.patch('/users/add-phone-number', formData);

export const uploadPhotoRequest = (userId: string, formData: FormData) =>
  customFetch.patch(`/users/${userId}/upload-profile-photo`, formData, {
    headers: multipartConfig,
  });

export const updateUserRequest = (formData: FormData) =>
  customFetch.patch('/users/update-user', formData, {
    headers: multipartConfig,
  });

export const addEducationRecordRequest = (formData: EducationFormType) =>
  customFetch.patch('/users/add-education', formData);

export const deleteEducationRecordRequest = (recordId: string) =>
  customFetch.patch(`/users/education/${recordId}`);

export const updateEducationRecordRequest = (
  formData: EducationFormType,
  educationRecordId: string
) =>
  customFetch.patch(
    `/users/education/${educationRecordId}/update-record`,
    formData
  );
export const getUserByIdRequest = (id: string): Promise<BaseApiReponse<User>> =>
  customFetch.get(`/users/profile/${id}`);
