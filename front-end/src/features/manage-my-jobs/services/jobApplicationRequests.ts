import { customFetch } from '../../../utils';
import { GetMyJobApplicationResponse } from '../types';

export const getMyApplicationRequest = (
  url: string
): Promise<GetMyJobApplicationResponse> =>
  customFetch.get(url).then((res) => res.data);
