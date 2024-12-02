import {
  JOB_STATUS,
  JOB_SORT_BY,
  JOB_TYPE,
  experianceLevel,
} from "../constant";

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

export type UserRole = "user" | "admin";
export type UserType = "recruiter" | "user" | null;

export type User = {
  _id: string;
  name: string;
  email: string;
  lastName?: string;
  location?: string;
  role?: UserRole;
  educationRecords?: Education[];
  avatar?: string[];
  accessStatus?: boolean;
  twoStepAuthentication?: boolean;
  phoneNumber?: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
};

export type Users = User[];
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
export type JobType = (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
export type JobSortBy = (typeof JOB_SORT_BY)[keyof typeof JOB_SORT_BY];
export type ExperianceLevel =
  (typeof experianceLevel)[keyof typeof experianceLevel];

export type Job = {
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
  openRoles?: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isApplied?: boolean;
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

export type GetUserJobsApiResponse = {
  totalJobs: number;
  totalPages: number;
  currentPage: number;
  jobs: Job[];
};

export type GetJobsApiResponse = {
  jobs: Job[];
  jobsCount: number;
  totalPages: number;
  page: number;
};

export type GetApplicationStatsResponse = {
  users: number;
  jobs: number;
};

export type JobApplication = {
  _id: string;
  candidateId: string;
  recruiterId: string;
  jobId: string;
  interviewDate: string;
  createdAt: string;
  updatedAt: string;
};
export type ModifiedJobApplication = {
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
export type GetMyApplicationResponse = {
  data: {
    jobApplications: ModifiedJobApplication[];
    pages: number;
    total: number;
    page: number;
  };
};
