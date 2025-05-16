import formatDate from './formatDate';
import customFetch from './customFetch';
import debounce from './debounce';
import { StatusObject } from '../lib/types/jobApplication';

function getLastStatusUpdatedDate(statusHistory: StatusObject[]) {
  const statusUpdatedDate = statusHistory[statusHistory.length - 1].updatedAt;
  return statusUpdatedDate;
}

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

export * from './checkDefaultTheme';
export * from './generateId';
export * from './generateYears';
export * from './customFetch';
export * from './debounce';
export * from './hasPermissions';
