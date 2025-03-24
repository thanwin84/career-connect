import { Button } from '../../../components/ui';
import HorizontalLine from '../../../components/ui/HorizontalDevider';
import { NotificationTypes } from '../../../lib/constants/constant';
import { Notification } from '../../../lib/types/notification';
import NotificationItem from './NotificationItem';
import { motion } from 'motion/react';

type Props = {
  className?: string;
  notifications: Notification[];
  isLoading: boolean;
  refetch: () => void;
  hasMore: boolean;
};

export default function NotificationsList({
  notifications,
  isLoading,
  refetch,
  hasMore,
}: Props) {
  console.log(notifications);
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed overflow-y-scroll  h-[85vh] bg-white dark:bg-zinc-800 right-4 w-[400px] px-4 py-5  border dark:border-gray-500 rounded-md shadow-lg mt-2 z-30"
    >
      <p className="text-base  font-bold text-slate-700 dark:text-slate-200 mb-2">
        Notifications
      </p>
      <HorizontalLine />

      {notifications.length > 0 && (
        <>
          <ul className="py-1">
            {notifications?.map((item) => {
              if (item.type === NotificationTypes.JOB_UPDATE) {
                return (
                  <NotificationItem
                    key={item.data.date}
                    company={item.data.company}
                    position={item.data.position}
                    status={item.data.status}
                    date={item.data.date}
                    className="hover:bg-gray-100 dark:hover:bg-zinc-700 mb-1 rounded-md px-2 py-1"
                  />
                );
              } else {
                return (
                  <p className="mb-1 py-1 text-slate-700 dark:text-slate-200">
                    {`User with id ${item.userId} has applied to ${item.data.jobTitle}`}
                  </p>
                );
              }
            })}
          </ul>
          {hasMore && (
            <Button
              onClick={refetch}
              loading={isLoading}
              classname=" text-center text-sm w-full bg-gray-100 hover:bg-gray-200 text-slate-800"
            >
              Load More
            </Button>
          )}
        </>
      )}
      {notifications.length === 0 && (
        <div className="flex justify-center mt-20">
          <p className="text-lg text-slate-600  dark:text-slate-300 font-semibold">
            You're all caught up!
          </p>
        </div>
      )}
    </motion.div>
  );
}
