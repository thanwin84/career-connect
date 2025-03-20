import { customFetch } from '../../utils';
import { CountryList } from '../types/common';

export const getCountryListRequest = (): Promise<CountryList> =>
  customFetch.get('/records/countries').then((res) => res.data.data);
