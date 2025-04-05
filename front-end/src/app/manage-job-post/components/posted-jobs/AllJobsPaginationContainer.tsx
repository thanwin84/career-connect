import { useLocation, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../../pages/PostedJobs';
import { Pagination } from '@/components/ui';

export default function AllJobsPaginationContainer() {
  let { data } = useAllJobsContext();
  const { pagination } = data.data;
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  function handlePageChange(pageNumber: number) {
    const query = new URLSearchParams(search);
    query.set('page', pageNumber.toString());
    const url = `${pathname}?${query}`;
    navigate(url);
  }

  return (
    <div>
      {pagination.totalItems > 1 && (
        <Pagination
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          handlePageChange={handlePageChange}
          className='justify-end'
        />
      )}
    </div>
  );
}
