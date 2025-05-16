import { Button, HorizontalDevider } from '@/components/ui';
import { NotificationTypes } from '@/lib/constants/constant';
import {
  AppliedJobNotificationItem,
  JobUpdateNotificationItem,
} from './notification-items';
import { motion } from 'motion/react';
import { useGetAllNotifications } from '@/hooks/api';
import NotificationSkeleton from './NotificationSkeleton';

type Props = {
  className?: string;
};

export default function NotificationsList({ className }: Props) {
  const {
    isLoading,
    loadMore,
    hasMore,
    data: notifications,
  } = useGetAllNotifications();

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={`fixed overflow-y-scroll  h-[85vh] bg-white dark:bg-stone-800 right-4 w-[400px] px-4 py-5  border dark:border-gray-500 rounded-md shadow-lg mt-2 z-30 ${className}`}
    >
      <p className='text-base  font-bold text-slate-700 dark:text-slate-200 mb-2'>
        Notifications
      </p>
      <HorizontalDevider />
      {isLoading && <NotificationSkeleton count={10} />}

      {notifications.length > 0 && (
        <>
          <ul className='py-1'>
            {notifications?.map((item) => {
              if (item.type === NotificationTypes.JOB_UPDATE) {
                return (
                  <JobUpdateNotificationItem
                    key={item.data.date}
                    company={item.data.company}
                    position={item.data.position}
                    status={item.data.status}
                    date={item.data.date}
                    className='hover:bg-gray-100 dark:hover:bg-zinc-700 mb-1 rounded-md px-2 py-1'
                  />
                );
              } else if (item.type === NotificationTypes.JOB_APPLY) {
                return (
                  <AppliedJobNotificationItem
                    key={item._id}
                    date={item.createdAt}
                    jobTitle={item.data.jobTitle}
                  />
                );
              }
            })}
          </ul>
          {hasMore && (
            <Button
              onClick={loadMore}
              loading={isLoading}
              classname=' text-center text-sm w-full bg-gray-100 hover:bg-gray-200 text-slate-800'
            >
              Load More
            </Button>
          )}
        </>
      )}
      {!isLoading && notifications.length === 0 && (
        <div className='flex justify-center mt-20'>
          <p className='text-lg text-slate-600  dark:text-slate-300 font-semibold'>
            You're all caught up!
          </p>
        </div>
      )}
    </motion.div>
  );
}
