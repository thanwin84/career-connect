import {
  BarChartIcon,
  ProfileIcon,
  AdminSettingIcon,
  CalenderIcon,
} from '../assets/icons/Icons';

const links = [
  {
    text: 'My Jobs',
    path: 'my-jobs',
    icon: <CalenderIcon />,
  },
  {
    text: 'stats',
    path: '.',
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
