import NotAvailablePic from '@/assets/images/not-available.svg';

export default function NotAvailable() {
  return (
    <div className='w-full space-y-4 '>
      <div className='w-[50%] mx-auto max-w-[300px]'>
        <img
          className='w-full bg-transparent'
          src={NotAvailablePic}
          alt='not available'
        />
      </div>
      <div className='text-center'>
        <h2 className='text-2xl font-semibold text-slate-800 dark:text-slate-200'>
          Your list is empty
        </h2>
      </div>
    </div>
  );
}
