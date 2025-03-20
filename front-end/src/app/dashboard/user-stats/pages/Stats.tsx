import { ChartsContainers, StatsContainer } from '../components';
import { useLoaderData } from 'react-router-dom';
import { getJobApplicationStatsRequest } from '../../../../lib/api/applicationStats';
import { JobApplicationStatsResponse } from '../../../../lib/types/jobApplication';

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
    <div className="">
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainers data={monthlyApplications} />
      )}
    </div>
  );
}
