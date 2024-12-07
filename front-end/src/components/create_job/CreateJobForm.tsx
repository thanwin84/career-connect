import { useState } from "react";
import { Input, Select, Button, SelectOptionsInput } from "../ui";
import { SalaryRange, Location } from ".";
import {
  JOB_STATUS,
  JOB_TYPE,
  experianceLevel,
} from "../../constants/constant";
import { useForm, FormProvider } from "react-hook-form";
import {
  CountryList,
  ExperianceLevel,
  FormData,
  Job,
  JobStatus,
  JobType,
} from "../../types";
import FormError from "../ui/FormError";

type Props = {
  countries: CountryList;
  job?: Job;
  title: string;
  buttonText: string;
  onSave: (formData: FormData) => void;
  isLoading: boolean;
};

type FormType = {
  company: string;
  position: String;
  jobLocation: string;
  jobStatus: JobStatus;
  jobType: JobType;
  experianceLevel: ExperianceLevel | null;
  country: string;
  salary: { min: number; max: number };
};

export default function CreateJobForm({
  countries,
  job,
  title,
  buttonText,
  onSave,
  isLoading,
}: Props) {
  const [experiance, setExperiance] = useState(job?.experianceLevel || "");
  const methods = useForm<FormType>({
    defaultValues: {
      company: job?.company || "SE",
      position: job?.position || "astha it",
      country: job?.country || "",
      jobLocation: job?.jobLocation || "",
      jobStatus: job?.jobStatus || JOB_STATUS.INTERVIEW,
      jobType: job?.jobType || JOB_TYPE.FULL_TIME,
      salary: {
        min: 0 || job?.salary?.min,
        max: 0 || job?.salary?.max,
      },
      experianceLevel: job?.experianceLevel || null,
    },
  });

  function handleSelect(level: ExperianceLevel) {
    setExperiance(level);
    methods.setValue("experianceLevel", level);
    methods.trigger("experianceLevel");
  }

  return (
    <FormProvider {...methods}>
      <form method="post" onSubmit={methods.handleSubmit(onSave)}>
        <div className="p-8 shadow-md bg-white  dark:bg-zinc-800 rounded-md">
          <h2 className="text-2xl mb-6 text-gray-800 font-medium dark:text-slate-100">
            {title}
          </h2>
          <div className="">
            <div className="lg:flex gap-4">
              <Input
                label="Position"
                className="mt-2"
                {...methods.register("position", {
                  required: "Position is required",
                })}
                errorMessage={methods.formState.errors.position?.message}
              />
              <Input
                label="Company"
                className="mt-2"
                {...methods.register("company", {
                  required: "Company is required",
                })}
                errorMessage={methods.formState.errors.company?.message}
              />
            </div>
            <Location
              className="mt-2"
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
                className="flex-1 mt-2"
                {...methods.register("jobStatus")}
              />
              <Select
                options={Object.values(JOB_TYPE)}
                label="Job Type"
                className="flex-1 mt-2"
                {...methods.register("jobType")}
              />
            </div>
            <div className="mt-2">
              <span className="block mb-2  text-slate-600 dark:text-slate-200">
                Select Experiance
              </span>
              <SelectOptionsInput
                options={Object.values(experianceLevel)}
                selectedOption={experiance}
                onSelect={handleSelect}
                name="experianceLevel"
                className="mt-4"
              />
              <input
                type="hidden"
                {...methods.register("experianceLevel", {
                  required: "Please select experiance level",
                })}
              />
              {methods.formState.errors.experianceLevel && (
                <FormError
                  message={
                    methods.formState.errors.experianceLevel?.message as string
                  }
                  id="experianceLevel"
                />
              )}
            </div>
            <SalaryRange className="mt-2" />

            <div className="flex justify-end">
              <Button
                category="success"
                type="submit"
                classname="mt-6"
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
