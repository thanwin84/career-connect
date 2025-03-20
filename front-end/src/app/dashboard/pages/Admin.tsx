import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { StatItem } from '../../../components/ui';
import { getApplicationStatsRequest } from '../../../lib/api/admin';
import UsersContainer from '../components/admin/UsersContainer';
import { ApplicationStatsResponse } from '../../../lib/types/admin';

export const loader = async () => {
  try {
    const data = await getApplicationStatsRequest();
    return data;
  } catch (error) {
    toast.error('You are not allowed to access this route', {
      autoClose: 3000,
    });
    return redirect('/dashboard');
  }
};

type Props = {
  className?: string;
};

export default function Admin({}: Props) {
  const {
    data: { jobs, users },
  } = useLoaderData() as ApplicationStatsResponse;
  return (
    <section>
      <ul className="p-6 flex gap-4">
        <li className="w-full">
          <StatItem
            count={users}
            title="Current User"
            icon={<FaSuitcaseRolling />}
            color="orange"
          />
        </li>
        <li className="w-full">
          <StatItem
            count={jobs}
            title="Total Jobs"
            icon={<FaCalendarCheck />}
            color="blue"
          />
        </li>
      </ul>
      <UsersContainer className="p-6" />
    </section>
  );
}
