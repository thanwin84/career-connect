import { FormData } from '../../../types';
import { customFetch } from '../../../utils';
export const createJobApplicationRequest = (formData: FormData) =>
  customFetch
    .post('/job-applications', formData)
    .then((response) => response.data);
