import { JOB_STATUS } from '../../app/constants/constant';
import { BaseApiReponse } from '../../types';

export type JobApplicationStats = {
  defaultStats: {
    [JOB_STATUS.APPLIED]: number;
    [JOB_STATUS.SHORTLISTED]: number;
    [JOB_STATUS.INTERVIEW]: number;
    [JOB_STATUS.DECLINED]: number;
    [JOB_STATUS.HIRED]: number;
  };
  monthlyApplications: { date: string; count: number }[];
};
export type JobApplicationStatsResponse = BaseApiReponse<JobApplicationStats>;
