import { useEffect, useState, useCallback, useRef } from 'react';
import { Pagination } from '../types';

type State<TData> = {
  data: TData[];
  page: number;
  isLoading: boolean;
  hasMore: boolean;
  isError: boolean;
  error: any;
};

type Func<T> = {
  data: T[];
  pagination: Pagination;
};

export function useInfiniteQuery<TData>(
  fn: (page: number) => Promise<Func<TData>>
) {
  const [state, setState] = useState<State<TData>>({
    data: [],
    page: 1,
    isLoading: false,
    hasMore: true,
    isError: false,
    error: null,
  });
  const isMounted = useRef(false);

  const runQuery = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      isError: false,
      error: null,
    }));
    try {
      const response = await fn(state.page);
      setState((prev) => ({
        data: prev.data ? [...prev.data, ...response.data] : response.data,
        isError: false,
        isLoading: false,
        hasMore:
          response.pagination.totalPages > response.pagination.currentPage,
        error: null,
        page: prev.page + 1,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isError: true,
        isLoading: false,
        error: error,
      }));
    }
  }, [fn, state.page]);

  useEffect(() => {
    if (!isMounted.current) {
      runQuery();
      isMounted.current = true;
    }
  }, []);

  const loadMore = () => {
    if (!state.isLoading && state.hasMore) {
      runQuery();
    }
  };

  return {
    ...state,
    loadMore,
  };
}
