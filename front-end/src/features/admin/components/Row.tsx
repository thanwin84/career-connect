import { ToggleStatus } from '.';
import { formatDate } from '../../../utils';
import { User } from '../../../types';

type Props = {
  user: User;
  handleToggle: () => void;
};

export default function Row({ handleToggle, user }: Props) {
  const { accessStatus, firstName, createdAt, role } = user;
  return (
    <tr className="border-b last:border-none">
      <td className="p-4">
        <ToggleStatus
          accessStatus={accessStatus as boolean}
          onToggleClick={handleToggle}
        />
      </td>
      <td className="p-4">
        {accessStatus ? (
          <span className="text-green-600 dark:text-green-500 border border-green-500 p-1 rounded-lg">
            Allowed
          </span>
        ) : (
          <span className="text-red-600 dark:text-red-500 border border-red-500 p-1 rounded-lg">
            Not Allowed
          </span>
        )}
      </td>
      <td className="p-4 text-center dark:text-slate-300">{firstName}</td>
      <td className="p-4  text-center dark:text-slate-300">
        {formatDate(createdAt?.toString() as string)}
      </td>
      <td
        className={`p-4 text-center dark:text-slate-300 ${
          role === 'admin' ? 'dark:text-yellow-500 text-yellow-600' : ''
        }`}
      >
        {role}
      </td>
    </tr>
  );
}
