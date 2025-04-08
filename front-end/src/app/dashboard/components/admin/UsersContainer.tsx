import { LoadingPage, Pagination } from '@/components/ui';
import { useGetUserList } from '@/hooks/api';
import { useSearchParams } from 'react-router-dom';
import UsersTable from './UsersTable';

type Props = {
  className?: string;
};

export default function UsersContainer({ className }: Props) {
  const { isLoading, data } = useGetUserList();
  const [searchParams, setSearchParams] = useSearchParams();

  if (!data) {
    return <LoadingPage />;
  }
  const { users, pagination } = data.data;

  function handlePageChange(pageNumber: number) {
    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
  }

  return (
    <div className={` w-full px-6 ${className}`}>
      <UsersTable isDataLoading={isLoading} users={users || []} />
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          handlePageChange={handlePageChange}
          className='justify-end'
        />
      )}
    </div>
  );
}
