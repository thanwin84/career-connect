import {
  ReEnterPasswordForm,
  TurnOn,
  TurnOff,
  Modal,
  CrossButton,
} from '@/components/ui';
import { useMultiStep } from '@/hooks';
import { useToggleAuthStatus } from '@/hooks/api';
import { useSettingStore } from '@/lib/store/SettingStore';
import { useUserStore } from '@/lib/store/userStore';
import { useEffect } from 'react';
import AddPhoneNumber from './AddPhoneNumber';
import EnterConfirmationCode from './EnterConfirmationCode';

export default function TwoStepAuthentication({}) {
  const userStore = useUserStore();
  const settingStore = useSettingStore();
  const { user } = userStore;

  const { isPending, isSuccess, updateTwoStepAuthStatus, resetState } =
    useToggleAuthStatus();

  const {
    step,
    next,
    goTo,
    reset: resetStep,
  } = useMultiStep(
    !user?.phoneNumber
      ? [<AddPhoneNumber moveToNextModal={() => goTo(0)} />]
      : [
          <EnterConfirmationCode moveToNextModal={() => next()} />,
          <ReEnterPasswordForm
            isPending={isPending}
            action={updateTwoStepAuthStatus}
            title='Re-enter your password'
            description='Please enter your password to turn on two step authentication'
          />,
        ]
  );
  useEffect(() => {
    if (isSuccess) {
      settingStore.toggleOpenModal();
      resetState();
      resetStep();
    }
  }, [isSuccess]);
  return (
    <div className='w-full'>
      <h3 className='text-xl text-slate-600 border-b py-2 dark:text-slate-200'>
        Two Step Authentication
      </h3>
      <div className='w-full mt-4 flex justify-between border px-4 py-2 rounded-md'>
        <span className='dark:text-slate-50'>
          Turn on Two Factor Authentication
        </span>
        <button onClick={settingStore.toggleOpenModal}>
          {user?.twoStepAuthentication ? <TurnOn /> : <TurnOff />}
        </button>
      </div>

      <Modal isOpen={settingStore.openModal}>
        <div className='relative w-[90%] md:w-[60%] mx-auto max-w-[600px]'>
          <CrossButton
            className='absolute right-4 top-10'
            action={settingStore.toggleOpenModal}
          />
          {step}
        </div>
      </Modal>
    </div>
  );
}
