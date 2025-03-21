import formatDate from './formatDate';
import customFetch from './customFetch';
import debounce from './debounce';
import { JobStatus } from '../lib/types/job';

function getLastStatusUpdatedDate(
  statusHistory: {
    status: JobStatus;
    updatedBy: string;
    updatedAt: string;
  }[]
) {
  const statusUpdatedDate = statusHistory[statusHistory.length - 1].updatedAt;
  return statusUpdatedDate;
}

export const extractDataFromResponse = <T>(response: { data: T }) =>
  response.data;
export { formatDate, customFetch, debounce, getLastStatusUpdatedDate };

export const formatTimer = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else if (time === 0) {
    return '00';
  } else {
    return `${time}`;
  }
};
