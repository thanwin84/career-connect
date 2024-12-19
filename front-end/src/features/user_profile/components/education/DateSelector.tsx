import { useMemo } from 'react';
import { Select } from '../../../../components/ui';
import { useFormContext } from 'react-hook-form';
import { months } from '../../../../constants/constant';
import { generateYears } from '../../../../utils/generateYears';

type Props = {
  title: string;
  monthName: string;
  yearName: string;
};
export default function DateSelector({ title, monthName, yearName }: Props) {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  const years = useMemo(() => generateYears(1980), []);

  return (
    <div className="">
      <p className="mb-2 dark:text-slate-200">{title}</p>
      <div className="flex gap-2">
        <Select
          {...register(monthName)}
          errorMessage={errors?.[monthName]?.message as string}
          options={['Select Month', ...months]}
          className="w-1/2"
        />
        <Select
          options={['Select Year', ...years]}
          className="w-1/2"
          {...register(yearName)}
          errorMessage={errors?.[yearName]?.message as string}
        />
      </div>
    </div>
  );
}
