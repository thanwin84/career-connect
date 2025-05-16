import {
  BarChartIcon,
  AdminSettingIcon,
  CalenderIcon,
  SettingIcon,
} from '@/assets/icons/Icons';

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
    text: 'admin',
    path: 'admin',
    icon: <AdminSettingIcon />,
  },
  {
    text: 'Setting',
    path: 'setting',
    icon: <SettingIcon />,
  },
] as const;

export default links;
