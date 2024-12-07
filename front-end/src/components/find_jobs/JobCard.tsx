import {
  DateRangeIcon,
  DollarIcon,
  LocationIcon,
  LoveIcon,
  LovedIcon,
} from "../../utils/Icons";
import Button from "../ui/Button";
import { useFindJobsContext } from "../../pages/FindJobs";
import { Job } from "../../types";
import { formatDate } from "../../utils";

type Props = {
  className?: string;
  job: Job;
  save?: boolean;
};
export default function JobCard({ className, job, save = false }: Props) {
  const { handleCurrentJobDetails, currentJobDetails, toggleOpenDetails } =
    useFindJobsContext();

  const date = formatDate(job.createdAt.toString());

  function handleClick() {
    handleCurrentJobDetails(job);
    toggleOpenDetails();
  }

  return (
    <article
      className={`w-full bg-white dark:bg-zinc-900 border rounded-md  hover:border-blue-400 hover:border-2 ${className} ${
        job._id === currentJobDetails?._id
          ? "border-2 border-blue-700"
          : "border-gray-200"
      }`}
      aria-labelledby={`job-title-${job._id}`}
      aria-describedby={`job-details- ${job._id}`}
      role="listitem"
    >
      <header className="flex justify-between mx-4 py-2 border-b border-gray-300">
        <div className="flex">
          <div className="mr-4 bg-blue-700 text-white p-4 rounded-md">
            {job.company?.substring(0, 1).toUpperCase()}
          </div>
          <div className="">
            <h2
              id={`job-title-${job._id}`}
              className="font-semibold text-gray-800 dark:text-slate-200"
            >
              {job.position}
            </h2>
            <h3 className="text-blue-800 dark:text-blue-600 ">{job.company}</h3>
          </div>
        </div>
        <div className="my-auto">
          <button
            className={`outline-none cursor-pointer text-xl ${
              save ? "text-red-500" : "text-red-500"
            }`}
            aria-label={save ? "Remove from save jobs" : "Save job"}
          >
            {save ? <LovedIcon /> : <LoveIcon />}
          </button>
        </div>
      </header>
      <div id={`job-details- ${job._id}`} className="mx-4 py-3">
        <p className="flex gap-4">
          <span className="my-auto dark:text-slate-200" aria-hidden={true}>
            <LocationIcon />
          </span>
          <span className="text-slate-700 dark:text-slate-300">{`${job.jobLocation}, ${job.country}`}</span>
        </p>
        <p className="flex gap-4">
          <span className="my-auto dark:text-slate-200" aria-hidden={true}>
            <DollarIcon />
          </span>
          <span className="text-slate-700 dark:text-slate-300">{`$${job?.salary?.min} - $${job?.salary?.max}`}</span>
        </p>
      </div>
      <div className="py-3 flex  justify-between px-4">
        <p className="flex  gap-2 mx-4 text-sm text-gray-500">
          <span className="my-auto dark:text-slate-300" aria-hidden={true}>
            <DateRangeIcon />
          </span>
          <span className="my-auto dark:text-slate-400">Posted {date}</span>
        </p>
        {job.isApplied && (
          <span className="px-4 py-2 rounded-md text-green-800 bg-green-100">
            Applied
          </span>
        )}
        <Button
          category="success"
          classname=""
          onClick={handleClick}
          aria-label={`See details of ${job.position} at ${job.company}`}
        >
          See Details
        </Button>
      </div>
    </article>
  );
}
