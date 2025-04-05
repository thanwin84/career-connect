import { BaseApiReponse, ID, TimeStamps } from '.';
import { UserFormType } from '../schemas';

export type Role = {
  _id: string;
  role: string;
  permissions: string[];
};
export type Location = {
  city: string;
  country: string;
};
export type Education = ID & {
  school: string;
  degree: string;
  department: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  currentlyStudying: boolean;
} & TimeStamps;

export type Company = {
  _id: string;
  name: string;
  description?: string;
  location: Location;
};
export type User = ID & {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: Location;
  accessStatus: boolean;
  twoStepAuthentication: boolean;
  isDeleted: Date | null;
  isEmailVerified: boolean;
  emailVerifyTokenExpiry: string | null;
  forgotPasswordTokenExpiry: string | null;
  role: Role[];
  educationRecords: Education[];
  company: Company;
  employees: string[];
  adminID: string;
  avatar?: {
    url: string;
    publicId: string;
  };
  coverPhoto?: {
    url: string;
    publicId: string;
  };
  phoneNumber?: string;
} & TimeStamps;

export type UpdateUserProfile = Pick<
  UserFormType,
  'firstName' | 'lastName' | 'location' | 'avatar' | 'phoneNumber' | 'email'
>;
// API RESPONSE
export type CurrentUserResponse = BaseApiReponse<User>;
