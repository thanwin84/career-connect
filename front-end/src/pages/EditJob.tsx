import { toast } from "react-toastify";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { CreateJobForm } from "../forms/create_job";
import { getJobRequest, getCountryListRequest } from "../apiRequest";
import { useUpdateJob } from "../api/JobApi";
import { CountryList, GetJobApiResponse } from "../types";

type Loader = {
  job: GetJobApiResponse;
  countries: CountryList;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const job = await getJobRequest(params.id as string);
    const countryList = await getCountryListRequest();
    const ob = { job: job, countries: countryList };

    return ob;
  } catch (error: any) {
    toast.error(error?.response?.data?.message, { autoClose: 200 });
    return error;
  }
};

type Props = {
  className?: string;
};

export default function EditJob({}: Props) {
  const { job, countries } = useLoaderData() as Loader;
  const { updateJob, isPending } = useUpdateJob();

  return (
    <main className="p-6">
      <CreateJobForm
        countries={countries}
        job={job.data.job}
        title="Edit Job"
        buttonText="Save Changes"
        onSave={updateJob}
        isLoading={isPending}
      />
    </main>
  );
}
