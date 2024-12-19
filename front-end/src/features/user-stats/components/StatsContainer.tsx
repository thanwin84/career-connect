import { StatItem } from '../../../components/ui';
import { jobStatusIcons } from '../../../constants/jobstatusIcons';
import { JobApplicationStats } from '../types';

export default function StatsContainer({
  defaultStats,
}: Omit<JobApplicationStats, 'monthlyApplications'>) {
  const { applied, interview, shortListed, declined, hired } = defaultStats;

  return (
    <ul
      className="p-6 flex gap-6 flex-col lg:flex-row justify-center"
      aria-label="Job application statistics"
    >
      <li className="w-full">
        <StatItem
          title="Applied Applications"
          count={applied}
          color="blue"
          icon={jobStatusIcons.applied}
        />
      </li>
      <li className="w-full">
        <StatItem
          title="Shorlitested Applications"
          count={shortListed}
          color="orange"
          icon={jobStatusIcons.shortListed}
        />
      </li>
      <li className="w-full">
        <StatItem
          title="Upcoming Interviews"
          count={interview}
          color="orange"
          icon={jobStatusIcons.interview}
        />
      </li>
      <li className="w-full">
        <StatItem
          title="Hired"
          count={hired}
          color="green"
          icon={jobStatusIcons.hired}
        />
      </li>
      <li className="w-full">
        <StatItem
          title="Declined Applications"
          count={declined}
          color="red"
          icon={jobStatusIcons.declined}
        />
      </li>
    </ul>
  );
}
