import { ReactNode } from "react";
import { JobStatus } from "../../types";
import {
  CalenderIcon,
  HiredIcon,
  RejectedIcon,
  ShortListIcon,
  SuccessIcon,
} from "../../utils/Icons";

type Props = {
  className?: string;
  status: JobStatus;
};

const icons: Record<JobStatus, ReactNode> = {
  applied: <SuccessIcon className="text-green-500 dark:text-green-400" />,
  hired: <HiredIcon className="text-blue-500 dark:text-blue-400" />,
  interview: <CalenderIcon className="text-green-500 dark:text-green-400" />,
  declined: <RejectedIcon className="text-red-500 dark:text-red-400" />,
  shortListed: <ShortListIcon className="text-green-500 dark:text-green-400" />,
  all: <></>,
};

export default function JobStatusIcon({ status }: Props) {
  return (
    <span aria-hidden="true" className="my-auto">
      {icons[status]}
    </span>
  );
}
