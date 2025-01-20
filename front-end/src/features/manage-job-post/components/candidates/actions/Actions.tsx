import { useCandidateStore } from '../../../../../store/CandidateStore';
import ChangeStatus from './ChangeStatus';
import Selected from './Selected';

type Props = {
  className?: string;
};

export default function Actions({ className }: Props) {
  const candidateStore = useCandidateStore();

  return (
    <div
      className={`relative my-0 flex gap-4 text-slate-600 dark:text-slate-200  font-semibold ${className}`}
    >
      <Selected
        deselectAll={candidateStore.removeAllSelectedItems}
        count={candidateStore.selectedApplicantIds.length}
      />
      <ChangeStatus />
    </div>
  );
}
