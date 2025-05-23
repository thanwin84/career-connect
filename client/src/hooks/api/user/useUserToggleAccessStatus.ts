import { toggleAccessStatusRequest } from '@/lib/api';
import { UserListResponse } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useUserToggleAccessStatus = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      toggleAccessStatusRequest(userId),
    onMutate: async ({ userId }) => {
      await queryClient.cancelQueries({ queryKey: ['userList'] });
      const previousData = queryClient.getQueryData<UserListResponse>([
        'userList',
      ]);
      queryClient.setQueryData<UserListResponse>(
        ['userList', searchParams.toString()],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              users: oldData.data.users.map((user) =>
                user._id === userId
                  ? { ...user, accessStatus: !user.accessStatus }
                  : user
              ),
              pagination: oldData.data.pagination,
            },
          };
        }
      );
      return {
        previousData,
      };
    },
    onSuccess: () => {
      toast.success('User access status is updated successfully.');
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['userList'], context.previousData);
      }
      toast.error('Failed to update access status.');
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['userList'] }),
  });
};
