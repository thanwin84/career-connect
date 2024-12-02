import { Users } from "../../types";
import Row from "./Row";

type Props = {
  className?: string;
  handleToggle: (id: string) => void;
  users: Users;
};

export default function UsersTable({ handleToggle, users }: Props) {
  const headers = [
    "Ban",
    "Access Status",
    "User's Name",
    "Joined Date",
    "Role",
  ];
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
        {users?.map((user) => (
          <Row key={user._id} user={user} handleToggle={handleToggle} />
        ))}
      </tbody>
    </table>
  );
}
