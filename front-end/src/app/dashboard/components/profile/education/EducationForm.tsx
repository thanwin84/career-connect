import { Checkbox, Button } from '../../../../../components/ui';
import { DateSelector } from '.';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormHeader from '../../../../../components/forms/FormHeader';
import FormInput from '../../../../../components/forms/FormInput';
import { educationFormSchema } from '../../../../../lib/schemas/educationFormSchema';
import { Education } from '../../../../../lib/types/user';

type Props = {
  title: string;
  onSave: (formData: Education) => void;
  record: Education;
  isPending: boolean;
  closeModal: () => void;
  submitButtonText: string;
  id?: string;
  className?: string;
};

export default function EducationForm({
  title,
  onSave,
  record,
  isPending,
  closeModal,
  submitButtonText,
  id = 'id',
  className,
}: Props) {
  const methods = useForm<Education>({
    defaultValues: record,
    resolver: zodResolver(educationFormSchema),
  });
  const { handleSubmit, register, watch } = methods;

  const isChecked = watch('currentlyStudying');

  return (
    <section
      className={`bg-white dark:bg-zinc-900 px-6 py-6 rounded-lg ${className}`}
    >
      <FormHeader title={title} id={id} closeModal={closeModal} />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSave)}
          className="flex flex-col gap-3 p-4"
          aria-labelledby={id}
        >
          <FormInput
            label="School/College"
            placeholder="Which school/College have you studied at?"
            name="school"
          />
          <FormInput label="Degree" placeholder="ex:B.E" name="degree" />
          <FormInput
            label="Department"
            placeholder="ex:Computer Science and Engineering"
            name="department"
          />
          <DateSelector
            title="Starting From"
            monthName="startMonth"
            yearName="startYear"
          />

          <Checkbox
            label="Currently studying"
            {...register('currentlyStudying')}
          />

          {!isChecked && (
            <DateSelector
              title="Ending in"
              monthName="endMonth"
              yearName="endYear"
            />
          )}
          <Button
            loading={isPending}
            type="submit"
            classname="self-end mt-2"
            aria-label={submitButtonText}
          >
            {submitButtonText}
          </Button>
        </form>
      </FormProvider>
    </section>
  );
}
