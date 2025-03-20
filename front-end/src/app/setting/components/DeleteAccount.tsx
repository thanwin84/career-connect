import { useState } from 'react';
import { ReEnterPasswordForDelete, ConfirmAccountDelete } from '.';
import { Modal, CrossButton } from '../../../components/ui';
import useMultiStep from '../../../hooks/useMultiStep';
import { useUserStore } from '../../../lib/store/userStore';
import { User } from '../../../lib/types/user';

type Props = {
  className?: string;
};

export default function DeleteAccount({ className }: Props) {
  const userStore = useUserStore();

  const { step, next, goTo } = useMultiStep([
    <ConfirmAccountDelete
      userData={userStore.user as User}
      moveToNextModal={() => next()}
    />,
    <ReEnterPasswordForDelete />,
  ]);
  const [openModal, setOpenModal] = useState(false);

  function toggleOpenModal() {
    setOpenModal(!openModal);
    goTo(0);
  }

  return (
    <div
      className={`w-full px-2 py-4 dark:border-gray-500 border-gray-300 border-t border-b ${className}`}
    >
      <h3 className="text-xl font-bold text-slate-700 pb-2 dark:text-slate-200">
        Delete Account
      </h3>
      <p className="font-roboto text-slate-500 dark:text-slate-300">
        Delete your account and all your information related to your account
        will be deleted parmanently. Please make sure before deleting your
        account
      </p>
      <button
        className="bg-gray-300 px-4 py-2  rounded-md mt-4 text-slate-500 hover:bg-red-500 hover:text-white"
        onClick={toggleOpenModal}
        aria-label="Delete your account"
      >
        Delete Account
      </button>
      {
        <Modal titleId="delete-account" isOpen={openModal}>
          <div className="relative w-[90%] md:w-[60%] mx-auto max-w-[600px]">
            <CrossButton
              className="absolute right-4 top-10"
              action={toggleOpenModal}
            />
            {step}
          </div>
        </Modal>
      }
    </div>
  );
}
