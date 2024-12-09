import { Input, Select, Button, SelectSingleOptionBox } from "../ui";
import { SalaryRange, Location } from ".";
import {
  JOB_STATUS,
  JOB_TYPE,
  experianceLevel,
} from "../../constants/constant";
import { useForm, FormProvider } from "react-hook-form";
import { CountryList, FormData, Job } from "../../types";
import { createJobFormSchema, JobCreationForm } from "../../form-validation";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const methods = useForm<JobCreationForm>({
    resolver: zodResolver(createJobFormSchema),
    defaultValues: {
      ...job,
      applicationDeadline: new Date(job?.applicationDeadline || new Date())
        .toISOString()
        .split("T")[0],
    },
  });

  return (
    <FormProvider {...methods}>
      <form method="post" onSubmit={methods.handleSubmit(onSave)}>
        <div className="p-8 shadow-md bg-white  dark:bg-zinc-800 rounded-md">
          <h2 className="text-2xl mb-6 text-gray-800 font-medium dark:text-slate-100">
            {title}
          </h2>
          <div className="space-y-4">
            <div className="lg:flex gap-4">
              <Input
                label="Position"
                {...methods.register("position")}
                errorMessage={methods.formState.errors.position?.message}
              />
              <Input
                label="Company"
                {...methods.register("company")}
                errorMessage={methods.formState.errors.company?.message}
              />
            </div>
            <Location
              countryList={countries}
              country={methods.formState.defaultValues?.country as string}
              jobLocation={
                methods.formState.defaultValues?.jobLocation as string
              }
            />
            <div className="lg:flex gap-4">
              <Select
                options={Object.values(JOB_STATUS)}
                label="Job Status"
                className="flex-1"
                {...methods.register("jobStatus")}
              />
              <Select
                options={Object.values(JOB_TYPE)}
                label="Job Type"
                className="flex-1"
                {...methods.register("jobType")}
              />
            </div>
            <SelectSingleOptionBox
              options={Object.values(experianceLevel)}
              name="experianceLevel"
              title="Select Experiance Level"
            />
            <div className="flex flex-col md:flex-row md:gap-4">
              <Input
                {...methods.register("applicationDeadline")}
                label="Application Deadline"
                type="date"
              />
              <Input
                label="Number of openning roles"
                type="number"
                {...methods.register("openRoles")}
                errorMessage={methods.formState.errors.openRoles?.message}
              />
            </div>
            <SalaryRange />
            <div className="flex justify-end">
              <Button
                category="success"
                type="submit"
                classname="mt-6 "
                loading={isLoading}
                loadingText={"In progress..."}
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
