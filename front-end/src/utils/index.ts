import formatDate from "./formatDate";
import customFetch from "./customFetch";
import debounce from "./debounce";
import { JobStatus } from "../types";

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

export { formatDate, customFetch, debounce, getLastStatusUpdatedDate };
