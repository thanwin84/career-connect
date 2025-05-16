import { customFetch } from '@/utils';
import { CountryList } from '@/lib/types';

export const getCountryListRequest = (): Promise<CountryList> =>
  customFetch.get('/records/countries');

export * from './user';
export * from './admin';
export * from './applicationStats';
export * from './jobApplication';
export * from './notification';
export * from './setting';
export * from './auth';
export * from './job';
