import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { StatItem } from '@/components/ui';
import { getApplicationStatsRequest } from '@/lib/api';
import { ApplicationStatsResponse } from '@/lib/types';
import UsersContainer from '../components/admin/UsersContainer';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  try {
    const data = await getApplicationStatsRequest();
    return data;
  } catch {
    toast.error('You are not allowed to access this route', {
      autoClose: 3000,
    });
    return redirect('/dashboard');
  }
};

export default function Admin() {
  const {
    data: { jobs, users },
  } = useLoaderData() as ApplicationStatsResponse;
  return (
    <section className=''>
      <ul className='p-6 flex flex-col md:flex-row gap-4'>
        <StatItem
          count={users}
          title='Current User'
          icon={<FaSuitcaseRolling />}
          color='orange'
        />
        <StatItem
          count={users}
          title='Current User'
          icon={<FaSuitcaseRolling />}
          color='orange'
        />
        <StatItem
          count={jobs}
          title='Total Jobs'
          icon={<FaCalendarCheck />}
          color='blue'
        />
      </ul>
      <UsersContainer />
    </section>
  );
}
