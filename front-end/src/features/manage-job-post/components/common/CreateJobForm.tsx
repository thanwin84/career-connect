import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { SelectSingleOptionBox, Button } from '../../../../components/ui';
import {
  JOB_STATUS,
  JOB_TYPE,
  experianceLevel,
} from '../../../../app/constants/constant';
import FormInput from '../../../../components/forms/FormInput';
import FormSelect from '../../../../components/forms/FormSelect';
import { CountryList, Job, FormData } from '../../../../types';
import { createJobFormSchema, CreateJobFormType } from '../../validations';
import { SalaryRange, Location } from './';

type Props = {
  countries: CountryList;
  job?: Job;
  title: string;
  buttonText: string;
  onSave: (formData: FormData) => void;
  isLoading: boolean;
};

export default function CreateJobForm({
  countries,
  job,
  title,
  buttonText,
  onSave,
  isLoading,
}: Props) {
  const methods = useForm<CreateJobFormType>({
    resolver: zodResolver(createJobFormSchema),
    defaultValues: {
      ...job,
      applicationDeadline: new Date(job?.applicationDeadline || new Date())
        .toISOString()
        .split('T')[0],
    },
  });
  return (
    <FormProvider {...methods}>
      <form method="post" onSubmit={methods.handleSubmit(onSave)}>
        <div className="p-8  bg-white  dark:bg-zinc-800 rounded-md">
          <h2 className="text-2xl mb-6 text-gray-800 font-medium dark:text-slate-100">
            {title}
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <FormInput label="Position" name="position" />
              <FormInput label="Company" name="company" />
            </div>
            <Location
              countryList={countries}
              country={methods.formState.defaultValues?.country as string}
              jobLocation={
                methods.formState.defaultValues?.jobLocation as string
              }
            />
            <div className="lg:flex gap-4">
              {title.toLocaleLowerCase() !== 'add job' && (
                <FormSelect
                  options={Object.values(JOB_STATUS)}
                  name="jobStatus"
                  label="Job Status"
                  className="flex-1"
                  placeholder="Select Job Status"
                />
              )}
              <FormSelect
                options={Object.values(JOB_TYPE)}
                label="Job Type"
                className="flex-1"
                name="jobType"
                placeholder="Select Job Type"
              />
            </div>
            <SelectSingleOptionBox
              options={Object.values(experianceLevel)}
              name="experianceLevel"
              title="Select Experiance Level"
            />
            <div className="flex flex-col md:flex-row gap-4">
              <FormInput
                label="Application Deadline"
                type="date"
                name="applicationDeadline"
              />
              <FormInput
                label="Number of openning roles"
                type="number"
                name="openRoles"
              />
            </div>
            <SalaryRange />
            <div className="flex justify-end">
              <Button
                type="submit"
                classname="mt-6 "
                loading={isLoading}
                loadingText={'In progress...'}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
