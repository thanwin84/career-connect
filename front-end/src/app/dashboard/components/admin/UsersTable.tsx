import {
  TableContainer,
  TableHead,
  TableTitle,
  TableContent,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { useUserToggleAccessStatus } from '@/hooks/api';
import { User } from '@/lib/types';
import { formatDate } from '@/utils';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ToggleStatus from './ToggleStatus';

type Props = {
  className?: string;
  users: User[];
  isDataLoading?: boolean;
};

export default function UsersTable({ users, isDataLoading = false }: Props) {
  const headers = [
    'Ban',
    'Access Status',
    "User's Name",
    'Joined Date',
    'Role',
  ];
  const [userList, setUserList] = useState<User[]>(users);
  const [originalUserList, setOrinalUserList] = useState<User[]>([]);
  const { toggleUserAccessStatus, isError } = useUserToggleAccessStatus();

  function handleToggle(userId: string) {
    setOrinalUserList(userList);
    setUserList((prevList) =>
      prevList.map((user) =>
        user._id === userId
          ? { ...user, accessStatus: !user.accessStatus }
          : user
      )
    );
    toggleUserAccessStatus(userId);
  }
  useEffect(() => {
    setUserList(users);
  }, [users]);

  useEffect(() => {
    if (isError) {
      setUserList(originalUserList);
      toast.error("Something went wrong. Could't not update access status");
    }
  }, [isError]);

  return (
    <TableContainer
      className={`${
        isDataLoading
          ? 'bg-black dark:bg-slate-800 dark:opacity-30 opacity-50'
          : 'bg-white dark:bg-zinc-900'
      }`}
    >
      <TableHead>
        {headers.map((item) => (
          <TableTitle key={item}>{item}</TableTitle>
        ))}
      </TableHead>
      <TableContent>
        {userList?.map((user) => (
          <TableRow>
            <TableCell>
              <ToggleStatus
                accessStatus={user.accessStatus as boolean}
                onToggleClick={() => handleToggle(user._id as string)}
              />
            </TableCell>
            <TableCell>{user.accessStatus ? 'true' : 'false'}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {formatDate(user?.createdAt?.toString() as string)}
            </TableCell>
            <TableCell>{user.role[0].role}</TableCell>
          </TableRow>
        ))}
      </TableContent>
    </TableContainer>
  );
}
