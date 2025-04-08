import Spinner from './Spinner';

const LoadingPage = () => {
  return (
    <div className='h-screen bg-gray-100 dark:bg-stone-900 w-full flex justify-center py-[8rem]'>
      <Spinner size='h-10 w-10' color='text-gray-800' />
    </div>
  );
};

export default LoadingPage;
