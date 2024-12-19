import { LoadingPage, Pagination } from '../../../components/ui';
import { useGetUserList } from '../hooks/useGetUserList';
import UsersTable from './UsersTable';
import { useSearchParams } from 'react-router-dom';

type Props = {
  className?: string;
};

export default function UsersContainer({ className }: Props) {
  const { isLoading, data } = useGetUserList();
  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading || !data) {
    return <LoadingPage />;
  }
  const { users, pagination } = data.data;

  function handlePageChange(pageNumber: number) {
    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
  }

  return (
    <div className={`w-full ${className}`}>
      <h2 className="mb-4 text-center text-xl text-slate-700 dark:text-slate-200 font-bold">
        Manage Users
      </h2>
      <UsersTable users={users || []} />
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          handlePageChange={handlePageChange}
          className="justify-end"
        />
      )}
    </div>
  );
}
