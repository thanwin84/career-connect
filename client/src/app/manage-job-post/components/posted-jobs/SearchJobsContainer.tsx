import { useState } from 'react';
import { Input, Button } from '@/components/ui';
import { useAllJobsContext } from '../../pages/PostedJobs';
import { Form, useSubmit } from 'react-router-dom';
import { useDebounce } from '@/hooks';
import { UserJobSearchParams } from '@/lib/types/job';
import { constants } from '@/config/appConfig';
import Select, { StylesConfig } from 'react-select';

type SelectOption = {
  value: string;
  label: string;
};

const styles: StylesConfig<SelectOption> = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menu: (base) => ({ ...base, zIndex: 9999 }),
  control: (base) => ({ ...base, cursor: 'pointer' }),
  option: (base) => ({ ...base, cursor: 'pointer' }),
};

export default function SearchJobsContainer() {
  const submit = useSubmit();
  const { searchValues } = useAllJobsContext();
  const { search, jobType, sort } = searchValues;
  const [formObject, setFormObject] = useState<UserJobSearchParams>({
    search: search,
    jobType: jobType || 'all',
    sort: sort || 'newest',
  });
  const debounce = useDebounce(500);

  const jobTypesOptions: SelectOption[] = Object.values(constants.JOB_TYPE).map(
    (value) => ({
      value: value,
      label: value.toUpperCase(),
    })
  );

  const sortingOptions: SelectOption[] = Object.values(
    constants.JOB_SORT_BY
  ).map((value) => ({
    value: value,
    label: value.toUpperCase(),
  }));

  function handleChange(value: string, key: string) {
    const newFormObject = { ...formObject, [key]: value };
    setFormObject(newFormObject);
    submit(newFormObject);
  }

  function handleClick() {
    setFormObject({
      search: '',
      jobType: 'all',
      sort: 'newest',
    });
  }

  return (
    <Form className='p-6'>
      <div className='px-4 py-6 bg-white dark:bg-stone-800 rounded-md shadow-md'>
        <h2 className='text-lg text-slate-800 dark:text-slate-200 mb-2 font-semibold'>
          Search Form
        </h2>
        <div className='grid lg:grid-cols-3 gap-4'>
          <Input
            label='Search'
            type='search'
            name='search'
            onChange={(e) => {
              setFormObject((prev) => ({ ...prev, search: e.target.value }));
              debounce(() => submit(e.target.form));
            }}
            value={formObject.search}
          />
          <div>
            <label className='text-slate-700 font-semibold'>Job Type</label>
            <Select<SelectOption>
              className='mt-2'
              value={jobTypesOptions.find(
                (option) => option.value === formObject.jobType
              )}
              placeholder='Select Job Type'
              options={jobTypesOptions}
              onChange={(option: SelectOption | null) =>
                handleChange(option?.value || '', 'jobType')
              }
              styles={styles}
            />
          </div>
          <div>
            <label className='text-slate-700 font-semibold'>Job Type</label>
            <Select<SelectOption>
              className='mt-2'
              value={sortingOptions.find(
                (option) => option.value === formObject.sort
              )}
              placeholder='Sort By'
              options={sortingOptions}
              onChange={(option: SelectOption | null) =>
                handleChange(option?.value || '', 'sort')
              }
              styles={styles}
            />
          </div>

          <div className='flex flex-col justify-end'>
            <Button onClick={handleClick}>Reset to Default Values</Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
