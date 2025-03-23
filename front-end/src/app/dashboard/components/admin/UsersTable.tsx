import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUserToggleAccessStatus } from '../../hooks/admin/useUserToggleAccessStatus';
import { Users } from '../../../../lib/types/user';
import { formatDate } from '../../../../utils';
import ToggleStatus from './ToggleStatus';
import {
  TableContainer,
  TableHead,
  TableTitle,
  TableRow,
  TableCell,
  TableContent,
} from '../../../../components/ui/table';

type Props = {
  className?: string;
  users: Users;
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
  const [userList, setUserList] = useState<Users>(users);
  const [originalUserList, setOrinalUserList] = useState<Users>([]);
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
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableContent>
    </TableContainer>
  );
}
