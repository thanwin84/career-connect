import { multipartConfig } from '../../config';
import { customFetch } from '../../utils';
import { FormData } from '../types/common';
import { CurrentUserResponse } from '../types/user';

export const getUserInformationRequest =
  async (): Promise<CurrentUserResponse> => {
    try {
      const response = await customFetch.get('/users/current-user');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const addPhoneNumberRequest = async (formData: FormData) => {
  try {
    await customFetch.patch('/users/add-phone-number', formData);
  } catch (error) {
    throw error;
  }
};
export const uploadPhotoRequest = async (
  userId: string,
  formData: FormData
) => {
  await customFetch.patch(`/users/${userId}/upload-profile-photo`, formData, {
    headers: multipartConfig,
  });
};
export const updateUserRequest = async (formData: FormData) => {
  await customFetch.patch('/users/update-user', formData, {
    headers: multipartConfig,
  });
};

export const addEducationRecordRequest = async (formData: FormData) =>
  await customFetch.patch('/users/add-education', formData);
export const deleteEducationRecordRequest = async (recordId: string) =>
  await customFetch.patch(`/users/education/${recordId}`);
export const updateEducationRecordRequest = async (
  formData: FormData,
  educationRecordId: string
) =>
  await customFetch.patch(
    `/users/education/${educationRecordId}/update-record`,
    formData
  );
