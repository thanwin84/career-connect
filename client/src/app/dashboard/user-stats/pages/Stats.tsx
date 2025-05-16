import { getJobApplicationStatsRequest } from '@/lib/api';
import { JobApplicationStatsResponse } from '@/lib/types';
import { useLoaderData } from 'react-router-dom';
import { StatsContainer, ChartsContainers } from '../components';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  try {
    const response = await getJobApplicationStatsRequest();
    return response;
  } catch (error) {
    return error;
  }
};

export default function Stats() {
  const data = useLoaderData() as JobApplicationStatsResponse;

  const { defaultStats, monthlyApplications } = data.data;
  return (
    <div className=''>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainers data={monthlyApplications} />
      )}
    </div>
  );
}
