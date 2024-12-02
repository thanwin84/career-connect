import { formatDate } from "../../utils";

type Props = {
  className?: string;
  position: string;
  company: string;
  jobLocation: string;
  country: string;
  jobCreatedDate: string;
};

export default function JobHeader({
  className,
  position,
  company,
  jobLocation,
  country,
  jobCreatedDate,
}: Props) {
  return (
    <div>
      <div className={`mg-4 ${className}`}>
        <h2 className="dark:text-slate-100 text-slate-800 text-2xl font-bold mb-4">
          {position}
        </h2>
      </div>
      <div className="flex gap-4 text-sm ">
        <span className="font-extrabold text-blue-500">
          {country.substring(0, 1)}
        </span>
        <span className="text-slate-700 dark:text-slate-300 font-semibold">
          {company}
        </span>
        <span className="text-slate-700 dark:text-slate-300">
          {jobLocation}, {country}
        </span>
        {/* TODO: add expires features */}
      </div>
      <div className="text-slate-700 dark:text-slate-300">
        <span className="mr-4">Posted {formatDate(jobCreatedDate)}</span>
        <span>Expire on 30 may, 2025</span>
      </div>
    </div>
  );
}
