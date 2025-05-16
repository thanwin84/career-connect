import {
  LocationArrowIcon,
  CalenderIcon,
  BriefcaseIcon,
} from '@/assets/icons/Icons';
import { Button } from '@/components/ui';
import { Job } from '@/lib/types';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { Form, Link, useNavigation } from 'react-router-dom';
import JobInfo from './JobInfo';
day.extend(advancedFormat);

type Props = {
  job: Job;
};

export default function JobCard({ job }: Props) {
  const date = day(job.createdAt).format('MMM Do, YYYY');
  const navagation = useNavigation();

  return (
    <article
      role='listitem'
      aria-labelledby={`job-title-${job._id}`}
      className='p-4 rounded-md mb-2 shadow-md bg-white dark:bg-stone-800'
    >
      <header className='flex border-b border-b-slate-200 p-4'>
        <div className='mr-4 bg-blue-700 text-white p-4 rounded-md'>
          {job.company.name.substring(0, 1).toUpperCase()}
        </div>
        <div className=''>
          <h3
            id={`job-title-${job._id}`}
            className='text-xl dark:text-slate-100'
          >
            {job.position}
          </h3>
          <h4 className='text-slate-600  dark:text-slate-200'>
            {job.company.name}
          </h4>
        </div>
      </header>
      <div className='p-4 grid grid-cols-2 gap-y-3'>
        <JobInfo
          icon={<LocationArrowIcon className='text-blue-600' />}
          text={job.jobLocation.city}
        />
        <JobInfo
          icon={<CalenderIcon className='text-blue-600' />}
          text={date}
        />
        <JobInfo
          icon={<BriefcaseIcon className='text-blue-600' />}
          text={job.jobType}
        />
      </div>
      <div className='flex gap-2 px-4'>
        <Link
          to={`../edit/${job._id}`}
          className='px-4 py-2 border border-gray-600 hover:bg-slate-800 hover:text-slate-200   dark:text-slate-200 dark:hover:bg-slate-100 dark:hover:text-slate-800  text-slate-800 rounded-md text-sm'
        >
          Edit
        </Link>
        <Form method='post' action={`../delete-job/${job._id}`}>
          <Button
            category='outlined'
            type='submit'
            classname='text-sm'
            loading={navagation.state === 'submitting'}
            loadingText='loading'
          >
            Delete
          </Button>
        </Form>
      </div>
    </article>
  );
}
