export type Theme = 'light' | 'dark';

export type BaseApiReponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
};

export type Pagination = {
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

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
