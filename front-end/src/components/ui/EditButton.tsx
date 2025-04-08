import { FiEdit } from 'react-icons/fi'; // Import the Edit icon

type Props = {
  className?: string;
  onClick: () => void;
};
const EditButton = ({ className, onClick }: Props) => {
  return (
    <button
      className={`flex items-center  text-white rounded-lg  transition duration-200 ${className}`}
      onClick={onClick}
    >
      <FiEdit className='mr-2 text-slate-600 dark:text-slate-300' />{' '}
      {/* Edit Icon */}
    </button>
  );
};

export default EditButton;
