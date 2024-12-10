import {
  CountryList,
  GetUserJobsApiResponse,
  UserJobSearchParams,
  User,
  ApplicationStatsResponse,
  FormData,
  JobListResponse,
  CurrentUserResponse,
  GetMyJobApplicationResponse,
  JobApplicationStatsResponse,
  UserListResponse,
  GetJobApiResponse,
  GetJAppliedJobIdListResponse,
} from "./types";
import { customFetch } from "./utils";

// user
export const getUserInformationRequest =
  async (): Promise<CurrentUserResponse> => {
    try {
      const response = await customFetch.get("/users/current-user");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
export const loginRequest = (formData: FormData): Promise<User> =>
  customFetch.post("/auth/login", formData).then((res) => res.data.data);

export const registerUserRequest = async (userData: FormData) => {
  await customFetch.post("/auth/register", userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const logoutUserRequest = async () =>
  await customFetch.get("/auth/logout");

export const reEnterPasswordRequest = async (formData: FormData) =>
  await customFetch.post("/account-setting/re-enter-password", formData);
export const deleteAccountRequest = async () =>
  await customFetch.delete("/account-setting/delete-account");
export const updateUserRequest = async (formData: FormData) => {
  await customFetch.patch("/users/update-user", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const uploadPhotoRequest = async (
  userId: string,
  formData: FormData
) => {
  await customFetch.patch(`/users/${userId}/upload-profile-photo`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const changePasswordRequest = async (formData: FormData) => {
  try {
    await customFetch.patch("/account-setting/change-password", formData);
  } catch (error) {
    throw error;
  }
};
export const toggleTwoStepAuthRequest = async (formData: FormData) => {
  try {
    await customFetch.post("/account-setting/re-enter-password", formData);
    await customFetch.patch("/account-setting/toggle-two-step-authentication");
  } catch (error) {
    throw error;
  }
};

export const addPhoneNumberRequest = async (formData: FormData) => {
  try {
    await customFetch.patch("/users/add-phone-number", formData);
  } catch (error) {
    throw error;
  }
};
//admin
export const getApplicationStatsRequest =
  (): Promise<ApplicationStatsResponse> =>
    customFetch.get("/users/admin/app-stats").then((res) => res.data);

export const getUserListRequest = (params: string): Promise<UserListResponse> =>
  customFetch.get(`/users/get-users-list?${params}`).then((res) => res.data);

export const toggleAccessStatusRequest = (userId: string) =>
  customFetch.patch(`/users/toggle-access-status/${userId}`);
// education
export const addEducationRecordRequest = async (formData: FormData) =>
  await customFetch.patch("/users/add-education", formData);
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
// jobs
export const createJobRequest = async (formData: FormData) =>
  await customFetch.post("/jobs", formData);
export const updateJobRequest = async (paramId: string, jobData: FormData) =>
  await customFetch.patch(`/jobs/${paramId}`, jobData);
export const getJobRequest = (jobId: string): Promise<GetJobApiResponse> =>
  customFetch.get(`/jobs/${jobId}`).then((res) => res.data);
export const getJobsRequest = async (
  searchParams: string
): Promise<JobListResponse> => {
  try {
    const response = await customFetch.get(`/jobs/all-jobs${searchParams}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCountryListRequest = (): Promise<CountryList> =>
  customFetch.get("/records/countries").then((res) => res.data.data);
export const getCurrentUserJobsRequest = (
  params: UserJobSearchParams
): Promise<GetUserJobsApiResponse> =>
  customFetch.get("/jobs", { params: params }).then((res) => res.data);

// twillio
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
      "/verification/verify-code",
      formData
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// job applications
export const createJobApplicationRequest = (formData: FormData) =>
  customFetch
    .post("/job-applications", formData)
    .then((response) => response.data);

export const getMyApplicationRequest = (
  url: string
): Promise<GetMyJobApplicationResponse> =>
  customFetch.get(url).then((res) => res.data);

export const getJobApplicationStatsRequest =
  (): Promise<JobApplicationStatsResponse> =>
    customFetch
      .get("/job-applications/job-application-stats")
      .then((res) => res.data);

export const getAppliedIdListRequest: Promise<GetJAppliedJobIdListResponse> =
  customFetch.get("/job-applications/applied").then((res) => res.data);
