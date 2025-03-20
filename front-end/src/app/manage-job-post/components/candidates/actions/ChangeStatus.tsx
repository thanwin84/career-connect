import { useState } from 'react';
import { CiViewTimeline } from 'react-icons/ci';
import { JOB_STATUS } from '../../../../../lib/constants/constant';
import { useCandidateStore } from '../../../../../lib/store/CandidateStore';
import { useManyJobApplicationStatusUpdate } from '../../../hooks/useManyJobApplicationStatusUpdate';
import { JobStatus } from '../../../../../lib/types/job';
type Props = {
  className?: string;
};

export default function ChangeStatus({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const candidateStore = useCandidateStore();
  const { updateManyJobApplicationStatus } =
    useManyJobApplicationStatusUpdate();
  function handleMainButtonClick() {
    setIsOpen(!isOpen);
  }

  function handleClickItem(value: JobStatus) {
    const queryParams = new URLSearchParams();
    candidateStore.selectedApplicantIds.forEach((item) => {
      queryParams.append('applicationIds[]', item);
    });

    setIsOpen(false);

    updateManyJobApplicationStatus({
      params: queryParams.toString(),
      data: { status: value },
    });
    candidateStore.updateSelectedItemsStatus(value);
  }

  return (
    <div className={`w-38 my-auto ${className}`}>
      <button
        className={`flex gap-2 hover:text-blue-700 dark:hover:text-blue-500`}
        onClick={handleMainButtonClick}
      >
        <CiViewTimeline className="my-auto" />
        <span>Change Status</span>
      </button>
      {isOpen && (
        <ul className="absolute mt-2  bg-white dark:bg-zinc-700  w-full shadow-lg rounded-md py-2 border">
          {Object.values(JOB_STATUS)
            .slice(0, -1)
            .map((value) => (
              <li
                onClick={() => handleClickItem(value)}
                className="text-center my-2 cursor-pointer text-slate-700 dark:text-slate-300 dark:hover:text-slate-200 hover:text-slate-800"
                key={value}
              >
                {value.slice(0, 1).toUpperCase() + value.slice(1)}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
