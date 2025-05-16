import { RxCross2 } from 'react-icons/rx';
type Props = {
  className?: string;
  closeSearchBar?: () => void;
  action: (form: FormData) => void;
};

export default function Search({ className, closeSearchBar, action }: Props) {
  return (
    <form
      action={action}
      className={`w-full p-2 rounded-md shadow-sm flex gap-4 bg-white dark:bg-zinc-800  ${className}`}
    >
      <input
        type='text'
        placeholder='search candidate by name'
        className='w-full dark:bg-zinc-800 text-slate-600 dark:text-slate-200 px-2 py-2 focus:outline-none flex-1'
        name='candidateName'
      />
      <button
        type='submit'
        className='border dark:text-slate-200 px-4 py-2 rounded-md hover:bg-gray-600  hover:text-slate-100'
      >
        Search
      </button>
      <span
        onClick={closeSearchBar}
        className='my-auto dark:text-slate-200  rounded-md hover:bg-gray-100 dark:hover:bg-zinc-600 hover:border w-10 p-2'
      >
        <RxCross2 className='mx-auto' size={20} />
      </span>
    </form>
  );
}
