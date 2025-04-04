import { CreateJobForm } from '../components/common';
import { useLoaderData } from 'react-router-dom';
import { useCreateJob } from '../hooks/useCreateJob';
import { getCountryListRequest } from '../../../lib/api';
import { CountryList } from '../../../lib/types';

type Props = {
  className?: string;
};

export const loader = async ({}: Props) => {
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
