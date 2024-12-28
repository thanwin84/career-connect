import { CreateJobForm } from '../components/common';
import { useLoaderData } from 'react-router-dom';
import { getCountryListRequest } from '../../../services/service';
import { CountryList } from '../../../types';
import { useCreateJob } from '../hooks/useCreateJob';

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
    <section className=" dark:text-white p-6">
      <CreateJobForm
        countries={countries}
        title="Add Job"
        buttonText="Create Job"
        onSave={createJob}
        isLoading={isPending}
      />
    </section>
  );
}