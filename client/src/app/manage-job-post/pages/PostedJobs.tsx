import { getCurrentUserJobsRequest } from '@/lib/api';
import { GetUserJobsApiResponse, UserJobSearchParams } from '@/lib/types';
import { createContext, useContext } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SearchJobsContainer, JobsContainer } from '../components/posted-jobs';

type LoaderType = {
  data: GetUserJobsApiResponse;
  searchValues: UserJobSearchParams;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = Object.fromEntries(
    new URL(request.url).searchParams.entries()
  );
  try {
    const data = await getCurrentUserJobsRequest(params);
    return { data, searchValues: params };
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const allJobsContext = createContext<LoaderType | undefined>(undefined);

export default function PostedJobs() {
  const { data, searchValues } = useLoaderData() as LoaderType;

  return (
    <allJobsContext.Provider
      value={{
        searchValues,
        data,
      }}
    >
      <section className=''>
        <SearchJobsContainer />
        <JobsContainer />
      </section>
    </allJobsContext.Provider>
  );
}
export const useAllJobsContext = () => {
  const context = useContext(allJobsContext);
  if (!context) {
    throw new Error('UseAllJobsContext must be used within AllJobs component');
  }
  return context;
};
