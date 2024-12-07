import { createContext, useState } from "react";
import {
  FilterJobsContainer,
  SearchBar,
  FindJobsContainer,
} from "../components/find_jobs";
import { SlideOpen } from "../components/ui";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import {
  ExperianceLevel,
  Job,
  JobSortBy,
  JobType,
  PublicJobsSearchParams,
  JobListResponse,
} from "../types";
import { getJobsRequest } from "../apiRequest";
import { JobDetails } from "../components";

type Loader = {
  data: JobListResponse;
  paramsObject: Partial<PublicJobsSearchParams>;
};
export type FormState = {
  jobType: JobType[];
  experianceLevel: ExperianceLevel[];
  location: string;
  search: string;
  sort: JobSortBy;
};
type ContextT = {
  data: JobListResponse;
  paramsObject: Partial<PublicJobsSearchParams>;
  resetFormState: () => void;
  updateFormState: (updates: Partial<FormState>) => void;
  toggleOpenDetails: () => void;
  formState: FormState;
  currentJobDetails: Job | undefined;
  handleCurrentJobDetails: (job: Job) => void;
  addAppliedId?: (id: string) => void;
};
export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const paramsObject: FormState = {
    jobType: params.getAll("jobType[]") as JobType[],
    experianceLevel: params.getAll("experianceLevel[]") as ExperianceLevel[],
    location: params.get("location") as string,
    search: params.get("search") as string,
    sort: params.get("sort") as JobSortBy,
  };

  try {
    const data = await getJobsRequest(url.search);

    return { data, paramsObject };
  } catch (error: any) {
    throw error;
  }
};

const findJobsContext = createContext<ContextT | undefined>(undefined);

export default function FindJobs() {
  const { data, paramsObject } = useLoaderData() as Loader;
  const [openDetails, setOpenDetails] = useState(false);
  const [currentJobDetails, setCurrentJobDetails] = useState<Job>();
  const [formState, setFormState] = useState<FormState>({
    jobType: paramsObject?.jobType || [],
    experianceLevel: paramsObject?.experianceLevel || [],
    location: paramsObject?.location || "",
    search: paramsObject?.search || "",
    sort: paramsObject?.sort || "newest",
  });

  function handleCurrentJobDetails(job: Job) {
    setCurrentJobDetails(job);
  }
  function resetFormState() {
    setFormState({
      jobType: [],
      experianceLevel: [],
      location: "",
      search: "",
      sort: "newest",
    });
  }

  function updateFormState(updates: Partial<FormState>) {
    setFormState((prev) => ({ ...prev, ...updates }));
  }

  function toggleOpenDetails() {
    setOpenDetails(!openDetails);
  }

  return (
    <section className="w-full  px-10">
      <findJobsContext.Provider
        value={{
          toggleOpenDetails,
          paramsObject,
          data,
          formState,
          resetFormState,
          updateFormState,
          currentJobDetails,
          handleCurrentJobDetails,
        }}
      >
        <SearchBar
          className="mt-4  mb-2 rounded-md "
          defaultSearch={formState.search as string}
          defaultLocation={formState.location as string}
        />
        <div className="w-full lg:w-5/6  flex flex-col md:flex-row gap-10 mt-4 relative">
          <FilterJobsContainer className="w-full mx-auto md:w-[280px] md:sticky md:top-0 md:self-start flex-none" />
          <FindJobsContainer className="w-2/6 flex-grow" />
        </div>

        <SlideOpen
          isOpen={openDetails}
          className="overflow-y-scroll"
          closeFn={toggleOpenDetails}
        >
          {openDetails && <JobDetails />}
        </SlideOpen>
      </findJobsContext.Provider>
    </section>
  );
}

export const useFindJobsContext = () => {
  const context = useContext(findJobsContext);
  if (!context) {
    throw new Error(
      "useFindJobsContext must be used within a FindJobsContext.Provider"
    );
  }
  return context;
};
