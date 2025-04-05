import { ChangeEvent, useState } from 'react';
import { Select, Input, Button } from '@/components/ui';
import { useAllJobsContext } from '../../pages/PostedJobs';
import { Form, useSubmit } from 'react-router-dom';
import { useDebounce } from '@/hooks';
import { UserJobSearchParams } from '@/lib/types/job';
import { constants } from '@/config/appConfig';

export default function SearchJobsContainer() {
  const submit = useSubmit();
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;
  const [formObject, setFormObject] = useState<UserJobSearchParams>({
    search: search,
    jobStatus: jobStatus || 'all',
    jobType: jobType || 'all',
    sort: sort || 'newest',
  });
  const debounce = useDebounce(500);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormObject((prev) => ({ ...prev, [name]: value }));
    submit(e.target.form);
  }
  function handleClick() {
    setFormObject({
      search: '',
      jobStatus: 'all',
      jobType: 'all',
      sort: 'newest',
    });
  }

  return (
    <Form className='p-6'>
      <div className='px-4 py-6 bg-white dark:bg-black/[0.96] rounded-md shadow-md'>
        <h2 className='text-xl text-slate-800 dark:text-slate-200 mb-4 font-semibold'>
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
          <Select
            label='Job Status'
            options={['all', ...Object.values(constants.JOB_STATUS)]}
            name='jobStatus'
            onChange={handleChange}
            value={formObject.jobStatus}
          />
          <Select
            label='Job Type'
            name='jobType'
            options={['all', ...Object.values(constants.JOB_TYPE)]}
            onChange={handleChange}
            value={formObject.jobType}
          />
          <Select
            label='Sort'
            name='sort'
            options={[...Object.values(constants.JOB_SORT_BY)]}
            value={formObject.sort}
            onChange={handleChange}
          />
          <div className='flex flex-col justify-end'>
            <Button onClick={handleClick}>Reset to Default Values</Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
