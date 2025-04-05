import { MdOutlineDelete } from 'react-icons/md';

type Props = {
  className?: string;
  deleteSelected: (applicantIds: string[]) => void;
  applicantIds: string[];
};

export default function Delete({
  className,
  deleteSelected,
  applicantIds,
}: Props) {
  return (
    <button
      className={`flex gap-2 hover:text-red-700 ${className}`}
      onClick={() => deleteSelected(applicantIds)}
    >
      <MdOutlineDelete className='my-auto' />
      <span>Delete</span>
    </button>
  );
}
