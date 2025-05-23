import { useUserToggleAccessStatus } from '@/hooks/api';
import { User } from '@/lib/types';
import { formatDate } from '@/utils';
import { useState } from 'react';
import ToggleStatus from './ToggleStatus';
import {
  SelectableCell,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import UserTableToolbar from './UserTableToolbar';
import EditButton from '@/components/ui/EditButton';
import { TrashButton } from '@/components/ui';

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
    'Actions',
  ];

  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { mutate: toggleUserAccessStatus } = useUserToggleAccessStatus();

  function handleAllSelect() {
    const isSelected = !isAllSelected;
    setIsAllSelected(isSelected);
    setSelectedIds(() => {
      if (isSelected) {
        return users.map((user) => user._id);
      } else {
        return [];
      }
    });
  }
  async function handleToggle(_id: string) {
    toggleUserAccessStatus({ userId: _id });
  }
  function handleSingleSelect(id: string) {
    const newList = selectedIds.includes(id)
      ? selectedIds.filter((_id) => _id !== id)
      : [...selectedIds, id];
    setSelectedIds(newList);
  }

  return (
    <div>
      <UserTableToolbar
        onClearAll={() => setSelectedIds([])}
        totalSelectItems={selectedIds.length}
      />

      <Table isDataLoading={isDataLoading}>
        <TableHead>
          <TableRow key={''}>
            <SelectableCell
              isSelected={isAllSelected}
              onSelect={() => handleAllSelect()}
            />
            {headers.map((title) => (
              <TableHeader sortable={title === 'Actions' ? false : true}>
                {title}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const isSelected = selectedIds.includes(user._id);
            return (
              <TableRow
                key={user._id}
                className={`${
                  isSelected
                    ? 'dark:bg-stone-600 bg-slate-200'
                    : 'hover:bg-gray-100  dark:hover:bg-stone-800'
                }`}
              >
                <SelectableCell
                  isSelected={isSelected}
                  onSelect={() => handleSingleSelect(user._id)}
                />
                <TableCell>
                  <ToggleStatus
                    accessStatus={user.accessStatus}
                    onToggleClick={() => handleToggle(user._id)}
                  />
                </TableCell>
                <TableCell>{user.accessStatus.toString()}</TableCell>
                <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  <ul>
                    {user.role.map((item) => (
                      <li key={item.role}>{item.role}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <div className='flex gap-2'>
                    <EditButton onClick={() => 1} />
                    <TrashButton onClick={() => 1} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
