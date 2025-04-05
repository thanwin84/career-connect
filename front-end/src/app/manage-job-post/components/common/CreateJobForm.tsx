import { FormInput, FormSelect } from '@/components/forms';
import { SelectSingleOptionBox, Button, LoadingButton } from '@/components/ui';
import { jobFormType, jobFormSchema } from '@/lib/schemas';
import { CountryList } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import SalaryRange from './SalaryRange';
import { constants } from '@/config/appConfig';

type Props = {
  countries: CountryList;
  job?: jobFormType;
  title: string;
  buttonText: string;
  onSave: (formData: jobFormType) => void;
  isLoading: boolean;
};

export default function CreateJobForm({
  job,
  title,
  buttonText,
  onSave,
  isLoading,
}: Props) {
  console.log(job);
  const methods = useForm<jobFormType>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      position: job?.position || '',
      jobLocation: {
        country: job?.jobLocation.country,
        city: job?.jobLocation.city,
      },
      experianceLevel: job?.experianceLevel,
      openRoles: job?.openRoles,
      salary: job?.salary,
      applicationDeadline: job?.applicationDeadline
        ? new Date(job.applicationDeadline).toISOString().split('T')[0]
        : '',
      jobType: job?.jobType,
    },
  });

  return (
    <FormProvider {...methods}>
      <form method='post' onSubmit={methods.handleSubmit(onSave)}>
        <div className='p-8  bg-white  dark:bg-black/[0.96] rounded-md'>
          <h2 className='text-2xl mb-6 text-gray-800 font-medium dark:text-slate-100'>
            {title}
          </h2>
          <div className='space-y-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <FormInput label='Position' name='position' />
            </div>
            <div className='flex gap-4'>
              <FormInput label='Country' name='jobLocation.country' />
              <FormInput label='City' name='jobLocation.city' />
            </div>

            <div className='lg:flex gap-4'>
              <FormSelect
                options={[
                  'Please select option',
                  ...Object.values(constants.JOB_TYPE),
                ]}
                label='Job Type'
                className='flex-1'
                name='jobType'
                placeholder='Select Job Type'
              />
            </div>
            <SelectSingleOptionBox
              options={Object.values(constants.experianceLevel)}
              name='experianceLevel'
              title='Select Experiance Level'
            />
            <div className='flex flex-col md:flex-row gap-4'>
              <FormInput
                label='Application Deadline'
                type='date'
                name='applicationDeadline'
              />
              <FormInput
                label='Number of openning roles'
                type='number'
                name='openRoles'
              />
            </div>
            <SalaryRange />

            <div className='flex justify-end'>
              {isLoading ? (
                <LoadingButton buttonText='Saving changes...' />
              ) : (
                <Button type='submit' classname='mt-6 w-full '>
                  {buttonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
