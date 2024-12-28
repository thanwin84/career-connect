import { ReactNode } from 'react';
import { JobStatus } from '../../types';
import {
  SuccessIcon,
  HiredIcon,
  CalenderIcon,
  RejectedIcon,
  ShortListIcon,
} from '../../assets/icons/Icons';

export const jobStatusIcons: Record<JobStatus, ReactNode> = {
  applied: <SuccessIcon className="text-green-500 dark:text-green-400" />,
  hired: <HiredIcon className="text-blue-500 dark:text-blue-400" />,
  interview: <CalenderIcon className="text-green-500 dark:text-green-400" />,
  declined: <RejectedIcon className="text-red-500 dark:text-red-400" />,
  shortListed: <ShortListIcon className="text-green-500 dark:text-green-400" />,
  all: <></>,
};
