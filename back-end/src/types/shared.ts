import {
  JOB_SORT_BY,
  JOB_STATUS,
  JOB_TYPE,
  UserRoles,
} from "../utils/constants";

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
export type JobType = (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
export type JobSortBy = (typeof JOB_SORT_BY)[keyof typeof JOB_SORT_BY];

export type Education = {
  _id: string;
  school: String;
  department: String;
  degree: String;
  startMonth: String;
  startYear: String;
  endMonth?: String;
  endYear?: String;
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