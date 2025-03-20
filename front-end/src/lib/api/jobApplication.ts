import { customFetch } from '../../utils';
import { FormData } from '../types/common';
import { GetJAppliedJobIdListResponse } from '../types/jobApplication';

export const createJobApplicationRequest = (formData: FormData) =>
  customFetch
    .post('/job-applications', formData)
    .then((response) => response.data);

export const getAppliedIdListRequest: Promise<GetJAppliedJobIdListResponse> =
  customFetch.get('/job-applications/applied').then((res) => res.data);
