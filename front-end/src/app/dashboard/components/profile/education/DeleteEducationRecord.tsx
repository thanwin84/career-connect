import { useEffect } from 'react';
import { Button } from '../../../../../components/ui';
import { useForm } from 'react-hook-form';
import { useProfileStore } from '../../../../../lib/store/ProfileStore';
import { useUserStore } from '../../../../../lib/store/userStore';
import { useDeleteEducationRecord } from '../../../hooks/user_profile/useDeleteEducationRecord';

type Props = {
  closeModal: () => void;
  className?: string;
};

export default function DeleteEducationRecord({
  closeModal,
  className,
}: Props) {
  const { isPending, deleteEducationRecord, isSuccess } =
    useDeleteEducationRecord();
  const profileStore = useProfileStore();
  const userStore = useUserStore();
  let id = '';
  const educationRecord = profileStore.selectedEducationRecord;
  if (educationRecord) {
    const { _id } = educationRecord;
    id = _id as string;
  }
  const { handleSubmit } = useForm();

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      userStore.deleteEducationRecord(id);
    }
  }, [isSuccess]);

  return (
    <form className="" onSubmit={handleSubmit(deleteEducationRecord)}>
      <Button
        category="lightDanger"
        type="submit"
        loading={isPending}
        classname={`mb-4 text-sm mx-auto px-6 ${className}`}
      >
        Delete
      </Button>
    </form>
  );
}
