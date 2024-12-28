import { ChangeEvent, useState } from 'react';
import { Select, Input } from '../../../../components/ui';
import { useAllJobsContext } from '../../pages/PostedJobs';
import {
  JOB_TYPE,
  JOB_STATUS,
  JOB_SORT_BY,
} from '../../../../app/constants/constant';
import { Form, useSubmit } from 'react-router-dom';
import { useDebounce } from '../../../../hooks';
import { UserJobSearchParams } from '../../../../types';

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
    <Form className="p-6">
      <div className="px-4 py-6 bg-white dark:bg-zinc-800 rounded-md shadow-md">
        <h2 className="text-xl text-slate-800 dark:text-slate-200 mb-4 font-semibold">
          Search Form
        </h2>
        <div className="grid lg:grid-cols-3 gap-4">
          <Input
            label="Search"
            type="search"
            name="search"
            onChange={(e) => {
              setFormObject((prev) => ({ ...prev, search: e.target.value }));
              debounce(() => submit(e.target.form));
            }}
            value={formObject.search}
          />
          <Select
            label="Job Status"
            options={['all', ...Object.values(JOB_STATUS)]}
            name="jobStatus"
            onChange={handleChange}
            value={formObject.jobStatus}
          />
          <Select
            label="Job Type"
            name="jobType"
            options={['all', ...Object.values(JOB_TYPE)]}
            onChange={handleChange}
            value={formObject.jobType}
          />
          <Select
            label="Sort"
            name="sort"
            options={[...Object.values(JOB_SORT_BY)]}
            value={formObject.sort}
            onChange={handleChange}
          />
          <div className="flex flex-col justify-end">
            <button
              onClick={handleClick}
              className="w-full bg-blue-500 text-white text-center px-4 py-2 rounded hover:bg-blue-600"
            >
              Reset to Default Values
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}