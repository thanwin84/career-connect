import {
  JOB_STATUS,
  JOB_SORT_BY,
  JOB_TYPE,
  experianceLevel,
  UserRoles,
} from "../constants/constant";

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

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
export type UserType = "recruiter" | "user" | null;

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

export type Users = User[];
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
export type JobType = (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
export type JobSortBy = (typeof JOB_SORT_BY)[keyof typeof JOB_SORT_BY];
export type ExperianceLevel =
  (typeof experianceLevel)[keyof typeof experianceLevel];

export type Job = {
  isApplied?: boolean;
  _id: string;
  company: string;
  position: string;
  jobStatus: JobStatus;
  jobType: JobType;
  jobLocation: string;
  country: string;
  salary: {
    min: number;
    max: number;
  };
  experianceLevel: ExperianceLevel;
  openRoles: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  applicationDeadline: Date;
  numberOfApplicants: number;
};

export type Jobs = Job[];
export type City = {
  _id: string;
  name: string;
};
export type Country = {
  _id: string;
  name: string;
  cities: City[];
};
export type CountryList = Country[];

export type FormData = Record<string, any>;

export type UserJobSearchParams = {
  limit?: string;
  page?: string;
  search?: string;
  jobStatus?: JobStatus | "all";
  jobType?: JobType | "all";
  sort?: JobSortBy;
};

export type PublicJobsSearchParams = {
  page: string;
  limit: string;
  jobType: JobType[];
  sort: JobSortBy | null;
  location: string | null;
  search: string | null;
  minSalary: string;
  maxSalary: string;
  experianceLevel: ExperianceLevel[];
};

export type UserJobs = {
  jobs: Job[];
  pagination: Pagination;
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

export type Pagination = {
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

// Api response

export type ApplicationStats = {
  users: number;
  jobs: number;
};

interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}
export type JobList = {
  jobs: Job[];
  pagination: Pagination;
};

export type JobApplicationStats = {
  defaultStats: {
    [JOB_STATUS.APPLIED]: number;
    [JOB_STATUS.SHORTLISTED]: number;
    [JOB_STATUS.INTERVIEW]: number;
    [JOB_STATUS.DECLINED]: number;
    [JOB_STATUS.HIRED]: number;
  };
  monthlyApplications: { date: string; count: number }[];
};

export type MyJobApplication = {
  _id: string;
  status: JobStatus;
  statusHistory: {
    status: JobStatus;
    updatedBy: string;
    updatedAt: string;
  }[];
  job: Job;
  recruiter: User;
};
export type GetMyJobApplication = {
  jobApplications: MyJobApplication[];
  pagination: Pagination;
};

export interface CurrentUserResponse extends ApiResponse<User> {}
export interface JobListResponse extends ApiResponse<JobList> {}
export interface JobApplicationStatsResponse
  extends ApiResponse<JobApplicationStats> {}

export interface GetMyJobApplicationResponse
  extends ApiResponse<GetMyJobApplication> {}
export interface GetUserJobsApiResponse extends ApiResponse<UserJobs> {}

// admin
export type UserList = {
  users: User[];
  pagination: Pagination;
};

export interface ApplicationStatsResponse
  extends ApiResponse<ApplicationStats> {}
export interface UserListResponse extends ApiResponse<UserList> {}
