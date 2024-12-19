import { useState } from 'react';

type Config<TData> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: any) => void;
};

type MutationState<TData> = {
  data: TData | null;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
};

const useMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  config: Config<TData> = {}
) => {
  const [state, setState] = useState<MutationState<TData>>({
    isPending: false,
    data: null,
    isError: false,
    error: '',
    isSuccess: false,
  });
  const { onError, onSuccess } = config;
  async function mutate(formData: TVariables) {
    try {
      setState({
        data: null,
        isPending: true,
        isError: false,
        error: '',
        isSuccess: false,
      });
      const data = await mutationFn(formData);
      if (onSuccess) {
        onSuccess(data);
      }
      setState({
        data: data,
        isPending: false,
        isError: false,
        error: '',
        isSuccess: true,
      });
    } catch (error) {
      if (onError) {
        onError(error);
      }
      setState({
        data: null,
        isPending: false,
        isError: true,
        error: error,
        isSuccess: false,
      });
    }
  }
  function resetState() {
    setState({
      isPending: false,
      data: null,
      isError: false,
      error: '',
      isSuccess: false,
    });
  }
  return {
    mutate,
    resetState,
    ...state,
  };
};

export default useMutation;
