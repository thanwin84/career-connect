import { useEffect, useState } from "react";
import { Users } from "../../types";
import Row from "./Row";
import { useUserToggleAccessStatus } from "../../api/adminApi";
import { toast } from "react-toastify";

type Props = {
  className?: string;
  users: Users;
};

export default function UsersTable({ users }: Props) {
  const headers = [
    "Ban",
    "Access Status",
    "User's Name",
    "Joined Date",
    "Role",
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
    if (isError) {
      setUserList(originalUserList);
      toast.error("Something went wrong. Could't not update access status");
    }
  }, [isError]);
  return (
    <table className="table-auto w-full bg-white dark:bg-zinc-900 shadow-md rounded-md">
      <thead>
        <tr>
          {headers.map((item, index) => (
            <th key={index} className="p-4  text-slate-700 dark:text-slate-200">
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {userList?.map((user) => (
          <Row
            key={user._id}
            user={user}
            handleToggle={() => handleToggle(user._id as string)}
          />
        ))}
      </tbody>
    </table>
  );
}
