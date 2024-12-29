import { FaPlus } from 'react-icons/fa6';
import { IoBag } from 'react-icons/io5';
import { BsPeople } from 'react-icons/bs';
import { CalenderIcon } from '../../assets/icons/Icons';

export const postJobsLinks = [
  {
    text: 'Create New',
    path: '.',
    icon: <FaPlus />,
  },
  {
    text: 'Jobs',
    path: 'jobs',
    icon: <IoBag />,
  },
  {
    text: 'Candidates',
    path: 'candidates',
    icon: <BsPeople />,
  },
  {
    text: 'Interviews',
    path: 'interviews',
    icon: <CalenderIcon />,
  },
];
