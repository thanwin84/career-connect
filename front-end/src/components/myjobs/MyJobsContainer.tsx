import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetMyApplications } from "../../api/JobApplication";
import { JobStatus, ModifiedJobApplication } from "../../types";
import { LoadingPage, Pagination } from "../ui";
import JobCard from "./JobCard";
import NotAvailable from "./NotAvailable";
import JobDescription from "./JobDescription";
import { useAppContext } from "../../contexts/AppProvider";
import { getLastStatusUpdatedDate } from "../../utils";
import { useWindowScreenSize } from "../../hooks";

type Props = {
  className?: string;
  type: JobStatus;
};

export default function MyJobsContainer({ type = "all" }: Props) {
  const { data, isLoading } = useGetMyApplications(type);
  const [searchParams, setSearchParams] = useSearchParams();
  const breakPoint = useWindowScreenSize();
  const navigate = useNavigate();

  const {
    myJobStore: { actions },
  } = useAppContext();

  if (isLoading) {
    return <LoadingPage />;
  }
  if (!data || data.data.jobApplications?.length === 0) {
    return <NotAvailable />;
  }

  const { jobApplications, pages, page } = data.data;
  function handlePageChage(pageNumber: number) {
    searchParams.set("page", String(pageNumber));
    setSearchParams(searchParams);
  }
  function handleClick(job: ModifiedJobApplication) {
    actions.selectMyJob(job);
    if (breakPoint === "sm") {
      navigate(`/dashboard/my-jobs/${job._id}`);
    }
  }
  return (
    <section className="flex  gap-6">
      <ul className="space-y-4 mt-4 w-[90%] md:w-[40%]">
        {jobApplications?.map((job) => {
          return (
            <li
              className="cursor-pointer"
              key={job._id}
              onClick={() => handleClick(job)}
            >
              <JobCard
                date={getLastStatusUpdatedDate(job.statusHistory)}
                key={job._id}
                job={job.job}
                jobStatus={job.status}
              />
            </li>
          );
        })}
        {pages > 1 && (
          <Pagination
            totalPages={pages}
            currentPage={page}
            handlePageChange={handlePageChage}
          />
        )}
      </ul>
      {breakPoint !== "sm" && <JobDescription className="flex-1 mt-4" />}
    </section>
  );
}
