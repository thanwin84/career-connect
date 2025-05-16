import { CreateJobForm } from '../components/common';
import { useLoaderData } from 'react-router-dom';
import { getCountryListRequest } from '@/lib/api';
import { CountryList } from '@/lib/types';
import { useCreateJob } from '@/hooks/api';

export const loader = async () => {
  try {
    const countryList = await getCountryListRequest();

    return countryList;
  } catch (error) {
    return error;
  }
};

export default function AddJob() {
  const countries = useLoaderData() as CountryList;
  const { createJob, isPending } = useCreateJob();

  return (
    <CreateJobForm
      countries={countries}
      title='Add Job'
      buttonText='Create Job'
      onSave={createJob}
      isLoading={isPending}
    />
  );
}
