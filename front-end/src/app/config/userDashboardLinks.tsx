import {
  BarChartIcon,
  QueryStatsIcon,
  FormIcon,
  ProfileIcon,
  AdminSettingIcon,
  CalenderIcon,
} from '../assets/icons/Icons';

const links = [
  {
    text: 'add job',
    path: '.',
    icon: <FormIcon />,
  },
  {
    text: 'all jobs',
    path: 'all-jobs',
    icon: <QueryStatsIcon />,
  },
  {
    text: 'My Jobs',
    path: 'my-jobs',
    icon: <CalenderIcon />,
  },
  {
    text: 'stats',
    path: 'stats',
    icon: <BarChartIcon />,
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <ProfileIcon />,
  },
  {
    text: 'admin',
    path: 'admin',
    icon: <AdminSettingIcon />,
  },
] as const;

export default links;
