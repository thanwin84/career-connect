import { customFetch, extractDataFromResponse } from '../../utils';
import { JobApplicationStatsResponse } from '../types/jobApplication';

export const getJobApplicationStatsRequest =
  (): Promise<JobApplicationStatsResponse> =>
    customFetch
      .get('/job-applications/job-application-stats')
      .then(extractDataFromResponse);
