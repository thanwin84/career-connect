import { customFetch } from '@/utils';
import { JobApplicationStatsResponse } from '@/lib/types';

export const getJobApplicationStatsRequest =
  (): Promise<JobApplicationStatsResponse> =>
    customFetch.get('/job-applications/job-application-stats');
