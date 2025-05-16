import { useCandidateStore } from '@/lib/store/CandidateStore';
import { JobApplication, JobStatus } from '@/lib/types';
import { formatDate } from '@/utils';
import Status from './Status';
import User from './User';
import { constants } from '@/config/appConfig';
import {
  SelectableCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Select from 'react-select';
import { useUpdateApplicationStatus } from '@/hooks/api';

type Props = {
  className?: string;
  isLoading: boolean;
  candidates: JobApplication[];
};
const headings = [
  'Candidate Name',
  'Status',
  'Job Title',
  'Applied Date',
  'Quick actions',
];
export default function CandidatesTable({ isLoading, candidates }: Props) {
  const { updateApplicationStatus } = useUpdateApplicationStatus();
  const candidateStore = useCandidateStore();
  const isAllSelected =
    candidateStore.jobApplicants?.length ===
    candidateStore.selectedApplicantIds.length;

  function handleUpdateApplicationStatus(
    applicantId: string,
    status: JobStatus
  ) {
    updateApplicationStatus({ applicationId: applicantId, data: { status } });
    candidateStore.updateStatus(applicantId, status);
  }
  const jobStatusOptions = Object.values(constants.JOB_STATUS)
    .slice(0, -1)
    .map((value) => ({
      value: value,
      label: value,
    }));

  return (
    <Table isDataLoading={isLoading}>
      <TableHead>
        <TableRow>
          <SelectableCell
            isSelected={isAllSelected}
            onSelect={candidateStore.selectAllItems}
          />
          {headings.map((heading) => (
            <TableHeader>{heading}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {candidates.map((candidate) => {
          const isSelected = candidateStore.selectedApplicantIds.includes(
            candidate._id
          );
          console.log(candidate);
          return (
            <TableRow
              className={`${
                isSelected
                  ? 'dark:bg-stone-600 bg-slate-200'
                  : 'hover:bg-gray-100  dark:hover:bg-stone-800'
              }`}
            >
              <SelectableCell
                isSelected={isSelected}
                onSelect={() => candidateStore.addSelectedItem(candidate._id)}
              />
              <TableCell>
                <User
                  name={candidate.candidate.firstName}
                  imgSrc={candidate.candidate.avatar?.url || ''}
                />
              </TableCell>
              <TableCell>
                <Status
                  className='mx-auto'
                  type={candidate.status as JobStatus}
                />
              </TableCell>
              <TableCell>{candidate.job?.position}</TableCell>
              <TableCell>
                {formatDate(candidate.statusHistory[0].createdAt).substring(3)}
              </TableCell>
              <TableCell>
                <Select
                  onChange={(selectedOption) =>
                    handleUpdateApplicationStatus(
                      candidate._id,
                      selectedOption?.value as JobStatus
                    )
                  }
                  value={jobStatusOptions.find(
                    (option) => option.value === candidate.status
                  )}
                  className='z-50 w-[160px] cursor-pointer'
                  classNamePrefix='react-select'
                  options={jobStatusOptions}
                  menuPortalTarget={
                    typeof window !== 'undefined' ? document.body : null
                  }
                  menuPosition='fixed'
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    menu: (base) => ({ ...base, zIndex: 9999 }),
                    control: (base) => ({ ...base, cursor: 'pointer' }),
                    option: (base) => ({ ...base, cursor: 'pointer' }),
                  }}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
