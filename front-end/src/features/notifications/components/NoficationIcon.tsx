import { IoIosNotificationsOutline } from 'react-icons/io';

type Props = {
  className?: string;
  unreadCount: number;
  toggleNotification: () => void;
};

export default function NotificationIcon({
  className,
  unreadCount = 0,
  toggleNotification,
}: Props) {
  return (
    <button
      onClick={toggleNotification}
      className={`relative flex items-center shadow-sm p-3 rounded-full hover:shadow-md dark:bg-zinc-700 hover:shadow-blue-300 ${className}`}
    >
      <IoIosNotificationsOutline
        size={22}
        className="my-auto text-slate-800 dark:text-slate-200 "
      />
      {unreadCount > 0 && (
        <span className="py-1 px-2 text-sm absolute -top-2 -right-2 bg-blue-400 text-white rounded-[50%]">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
