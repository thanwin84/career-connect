import { useState, useEffect } from 'react';

type QueryConfig<TData> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
};

type UserQueryState<TData> = {
  data: TData | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
};

const defaultConfig: QueryConfig<any> = {
  onSuccess: () => {},
  onError: () => {},
};

export default function useQuery<TData>(
  fn: (params?: string) => Promise<TData>,
  config: QueryConfig<TData> = defaultConfig,
  initialParams?: string
) {
  const [state, setState] = useState<UserQueryState<TData>>({
    data: null,
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: '',
  });
  const [params, setParams] = useState<string | undefined>(initialParams);

  const { onError, onSuccess } = config;

  const runQuery = async (newParams?: string) => {
    if (!fn) return;
    const paramToUse = newParams ?? params;
    setParams(paramToUse);

    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const res = await fn(params);
      setState({
        data: res,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: '',
      });
      if (onSuccess) {
        onSuccess(res);
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isError: true,
        error: error,
        data: null,
      }));
      if (onError) {
        onError(error);
      }
    }
  };

  useEffect(() => {
    runQuery(params);
  }, [params]);

  return { ...state, refetch: runQuery };
}
