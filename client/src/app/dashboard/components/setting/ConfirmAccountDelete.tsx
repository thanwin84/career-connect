import { Input, Button } from '@/components/ui';
import { User } from '@/lib/types';
import { useState } from 'react';

type Props = {
  userData: User;
  moveToNextModal: () => void;
};

export default function ConfirmAccountDelete({
  userData,
  moveToNextModal,
}: Props) {
  const [typedAccount, setTypedAccount] = useState('');
  const canDelete = typedAccount === userData.firstName;
  console.log(canDelete);
  return (
    <div className='w-full p-8 bg-white dark:bg-zinc-900 rounded-md'>
      <h4 className='text-slate-700 dark:text-slate-200 border-b py-2 mb-2 text-xl font-semibold'>
        Delete Account {userData.firstName}
      </h4>
      <p className='text-slate-600 font-semibold mb-2 dark:text-slate-300'>
        To confirm, type {`"${userData.firstName}"`} in the box below{' '}
      </p>
      <Input onChange={(e) => setTypedAccount(e.target.value)} />
      {canDelete ? (
        <Button
          type='submit'
          category='danger'
          classname='w-full mt-4 text-sm'
          disabled={canDelete}
          onClick={moveToNextModal}
        >
          Delete
        </Button>
      ) : (
        <span className='block w-full py-2 mt-4 text-sm bg-red-300 text-center text-white rounded-md'>
          Delete
        </span>
      )}
    </div>
  );
}
