import { Pagination } from '.';
import { Notification } from '../models/notification.model';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE, UserRoles } from '../constants';

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
export type JobType = (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
export type JobSortBy = (typeof JOB_SORT_BY)[keyof typeof JOB_SORT_BY];

export type Education = {
  _id: string;
  school: string;
  department: string;
  degree: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  currentlyStudying: boolean;
};
export type User = {
  _id?: string;
  firstName: string;
  email: string;
  lastName: string;
  location?: string;
  role?: UserRole;
  educationRecords?: Education[];
  avatar?: {
    url: string;
    publicId: string;
  };
  coverPhoto?: {
    url: string;
    publicId: string;
  };
  accessStatus?: boolean;
  twoStepAuthentication?: boolean;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type JobApplication = {
  _id: string;
  candidateId: string;
  recruiterId: string;
  jobId: string;
  interviewDate?: string;
  createdAt: string;
  updatedAt: string;
  status?: JobStatus;
  statusHistory: {
    status: JobStatus;
    updatedBy: string;
    updatedAt?: string;
  }[];
  notes?: string;
};

export type Job_Update_Notification = {
  company: string;
  position: string;
  status: JobStatus;
  date: string;
};

// Api Response
export type BaseApiReponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
};

export type GetAllNotificationsApiResponse = BaseApiReponse<{
  notifications: Notification[];
  pagination: Pagination;
}>;
