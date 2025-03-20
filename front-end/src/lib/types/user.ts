import { UserRoles } from '../constants/constant';

import { BaseApiReponse } from './common';

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
export type UserType = 'recruiter' | 'user' | null;

export type Education = {
  _id?: string;
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

export type Users = User[];

// API RESPONSE
export type CurrentUserResponse = BaseApiReponse<User>;
