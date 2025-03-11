import { JOB_STATUS } from '../../../../app/constants/constant';
import { Select } from '../../../../components/ui';
import { useCandidateStore } from '../../../../store/CandidateStore';
import { JobStatus } from '../../../../types';
import { formatDate } from '../../../../utils';
import { useUpdateApplicationStatus } from '../../hooks/useUpdateApplicationStatus';
import { Candidate } from '../../types';
import HeaderSelectableIcon from './HeaderSelectableIcon';
import SelectableIcon from './SelectableIcon';
import Status from './Status';
import User from './User';

type Props = {
  className?: string;
  isLoading: boolean;
  candidates: Candidate[];
};
const headings = [
  'Candidate Name',
  'Status',
  'Job Title',
  'Applied Date',
  'Quick actions',
];
export default function CandidatesTable({
  className,
  isLoading,
  candidates,
}: Props) {
  const { updateApplicationStatus } = useUpdateApplicationStatus();
  const candidateStore = useCandidateStore();
  const isAllSelected =
    candidateStore.jobApplicants?.length ===
    candidateStore.selectedApplicantIds.length;

  function handleUpdateApplicationStatus(
    applicantId: string,
    status: JobStatus
  ) {
    updateApplicationStatus({ applicationId: applicantId, data: status });
    candidateStore.updateStatus(applicantId, status);
  }

  return (
    <table className={`w-full shadow-sm  ${className}`}>
      <thead className=" rounded-md">
        <tr className=" bg-slate-200 dark:bg-black/[0.96] text-slate-700 dark:text-slate-200 rounded-md">
          {headings.map((heading) => (
            <td key={heading} className="text-center font-semibold p-3">
              <div className="flex gap-3">
                {heading === 'Candidate Name' && (
                  <HeaderSelectableIcon
                    selectAll={candidateStore.selectAllItems}
                    deselectAll={candidateStore.removeAllSelectedItems}
                    isSelected={isAllSelected}
                  />
                )}
                <span>{heading}</span>
              </div>
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {candidates?.map((candidate) => {
          const selectedItem =
            candidateStore.selectedApplicantIds.includes(candidate._id) ||
            isAllSelected;
          return (
            <tr
              className={`${
                selectedItem
                  ? 'bg-slate-100 dark:bg-zinc-600  '
                  : 'bg-white dark:bg-zinc-900'
              }    border-b  dark:border-b-gray-500 hover:bg-slate-100 dark:hover:bg-zinc-600 ${
                isLoading ? 'opacity-50' : ''
              } `}
              key={candidate._id}
            >
              <td className="p-2 flex gap-2">
                <SelectableIcon
                  isSelected={selectedItem}
                  applicantId={candidate._id}
                  selectItem={() =>
                    candidateStore.addSelectedItem(candidate._id)
                  }
                  deselectItem={() =>
                    candidateStore.removeSelectedItem(candidate._id)
                  }
                />
                <User
                  name={candidate.user.firstName}
                  imgSrc={candidate.user.avatar?.url || ''}
                />
              </td>
              <td className="p-2 w-28">
                <Status
                  className="mx-auto"
                  type={candidate.status as JobStatus}
                />
              </td>
              <td className="p-2 dark:text-slate-200">
                {candidate.job?.position}
              </td>
              <td className="p-2 dark:text-slate-200">
                {formatDate(candidate.createdAt).substring(3)}
              </td>
              <td className="p-2">
                <Select
                  value={candidate.status}
                  className="text-center"
                  placeholder="actions"
                  options={Object.values(JOB_STATUS).slice(0, -1)}
                  onChange={(e) =>
                    handleUpdateApplicationStatus(
                      candidate._id,
                      (e.target as HTMLSelectElement).value as JobStatus
                    )
                  }
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
