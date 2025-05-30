import { useLocation, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { SearchBar } from '@/app/find_jobs/components';

type Props = {
  className?: string;
};

export default function HomePage({}: Props) {
  const navigate = useNavigate();
  const { search } = useLocation();

  function handleSearchAction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams(search);
    const formData = new FormData(e.currentTarget);
    const location = formData.get('location') as string;
    const _search = formData.get('search') as string;
    params.delete('location');
    params.delete('search');
    if (location) {
      params.set('location', location);
    }
    if (_search) {
      params.set('search', _search);
    }
    if (location || _search) {
      navigate(`/jobs?${params}`);
    }
  }
  return (
    <main className='py-8 min-h-screen dark:bg-stone-800 bg-slate-50'>
      <div className='w-[90%] md:w-[80%] mx-auto space-y-6'>
        <div className='text-center'>
          <h2 className=' text-slate-700 font-extrabold tracking-wide text-4xl dark:text-blue-500'>
            Find Your Dream Job
          </h2>
          <p className='mt-2 text-xl font-semibold text-slate-600 dark:text-slate-300'>
            12,00+ Active Vacancies, Available Right Now!
          </p>
        </div>
        <SearchBar action={handleSearchAction} />
      </div>
    </main>
  );
}
