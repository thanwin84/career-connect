import { MultipleSelect, SingleOptionSelector } from '../../../components/ui';
import {
  JOB_SORT_BY,
  JOB_TYPE,
  experianceLevel,
} from '../../../app/constants/constant';
import { Form, useLocation, useNavigate, useSubmit } from 'react-router-dom';
import { FormState, useFindJobsContext } from '../pages/FindJobs';

type Props = {
  className?: string;
};
type FilterKey = keyof Pick<FormState, 'jobType' | 'experianceLevel'>;
export default function FilterJobsContainer({ className }: Props) {
  const submit = useSubmit();
  const { search } = useLocation();
  const { formState, resetFormState, updateFormState } = useFindJobsContext();
  const navigate = useNavigate();

  function handleSelect(option: string, key: FilterKey) {
    const newOptions = (formState[key] as string[]).includes(option)
      ? formState[key].filter((item) => item !== option)
      : [...formState[key], option];
    updateFormState({ [key]: newOptions });
    let params = new URLSearchParams(search);
    params.delete(`${key}[]`);
    newOptions.forEach((option) => {
      params.append(`${key}[]`, option);
    });

    submit(params);
  }
  function handleSingleSelect(option: string, key: string) {
    updateFormState({ [key]: option });
    let params = new URLSearchParams(search);
    params.delete(key);
    params.set(key, option);
    submit(params);
  }
  function handleClearFilter() {
    resetFormState();
    navigate('/jobs');
  }

  return (
    <Form
      aria-label="Filter buttons"
      className={`bg-white dark:bg-zinc-900  shadow-md  px-4 ${className}`}
    >
      <div className="flex justify-between px-3 py-3 border-b border-gray-300 dark:border-gray-500">
        <span className="font-medium text-gray-700 dark:text-slate-300">
          Filter
        </span>
        <button
          type="button"
          className="text-blue-600 font-semibold hover:text-blue-700 dark:hover:text-blue-400 "
          onClick={handleClearFilter}
          aria-label="click to reset filter"
        >
          Clear All
        </button>
      </div>
      <MultipleSelect
        options={Object.values(JOB_TYPE)}
        title="Job Type"
        onSelect={(option) => handleSelect(option, 'jobType')}
        selectedOptions={formState.jobType || []}
      />
      <MultipleSelect
        options={Object.values(experianceLevel)}
        title="Experiance"
        onSelect={(option) => handleSelect(option, 'experianceLevel')}
        selectedOptions={formState.experianceLevel || []}
      />
      <SingleOptionSelector
        title="Sort By"
        options={Object.values(JOB_SORT_BY)}
        selectedOption={formState.sort as string}
        onSelect={(option) => handleSingleSelect(option, 'sort')}
        className="border-none"
      />
    </Form>
  );
}
