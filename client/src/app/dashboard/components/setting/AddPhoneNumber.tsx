import { Input, Button } from '@/components/ui';
import { useAddPhoneNumber } from '@/hooks/api';
import { useSettingStore } from '@/lib/store/SettingStore';
import { useUserStore } from '@/lib/store/userStore';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SelectCountry from './SelectCountry';

type Props = {
  moveToNextModal: () => void;
};

export default function AddPhoneNumber({ moveToNextModal }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const settingStore = useSettingStore();
  const userStore = useUserStore();
  const { register, handleSubmit, formState, getValues } = useForm<{
    phoneNumber: string;
  }>();
  const { addPhoneNumber, isPending, isSuccess, resetState } =
    useAddPhoneNumber();

  function handleAddPhoneNumber(formData: { phoneNumber: string }) {
    const number = settingStore.selectedCountry.code + formData.phoneNumber;
    addPhoneNumber({ phoneNumber: number });
  }
  useEffect(() => {
    if (isSuccess) {
      userStore.addPhoneNumber(getValues().phoneNumber);
      resetState();
      moveToNextModal();
    }
  }, [isSuccess, resetState, getValues, moveToNextModal, userStore]);

  return (
    <div className='bg-white dark:bg-zinc-900 py-10 px-6 rounded-md'>
      {!isOpen && (
        <>
          <h4 className='mb-2 text-xl font-bold text-slate-800 dark:text-slate-100'>
            Add Phone Number
          </h4>
          <p className='mb-4 dark:text-slate-200 text-slate-500'>
            Please add your phone number to turn on Two factor authentication.
          </p>
          <div className='flex justify-between mb-3'>
            <span className='dark:text-slate-200'>
              {settingStore.selectedCountry?.name} (
              {settingStore.selectedCountry?.code})
            </span>
            <button
              className='dark:text-blue-500 text-blue-700 hover:underline'
              onClick={() => setIsOpen(!isOpen)}
            >
              Change
            </button>
          </div>

          <form
            onSubmit={handleSubmit(handleAddPhoneNumber)}
            className='flex flex-col space-y-3'
          >
            <Input
              {...register('phoneNumber', {
                required: 'Please provide your phoneNumber',
              })}
              errorMessage={formState.errors?.phoneNumber?.message as string}
            />
            <Button
              type='submit'
              category='success'
              classname='text-sm self-end'
              loading={isPending}
            >
              Add Number
            </Button>
          </form>
        </>
      )}
      {isOpen && (
        <SelectCountry
          onSelect={settingStore.onSelectCountry}
          selectedCountry={settingStore.selectedCountry}
          handleBackClick={() => setIsOpen(!isOpen)}
        />
      )}
    </div>
  );
}
