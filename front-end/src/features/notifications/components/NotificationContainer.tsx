import { useEffect, useState } from 'react';
import NotificationIcon from './NoficationIcon';
import NotificationsList from './NotificationsList';
import { useUserStore } from '../../../store/userStore';
import socket from '../../../socket';
import { useGetAllNotifications } from './hooks/useGetAllNotifications';

import { useGetUnreadCount } from './hooks/useGetUnreadCount';
import { useNotificationStore } from '../../../store/NotificationStore';
import { useMarkAsReadNotifications } from './hooks/useMarkAsReadNotifications';

type Props = {
  className?: string;
};

export default function NotificationContainer({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useGetUnreadCount();
  const { isLoading, loadMore, hasMore } = useGetAllNotifications();
  const { markAsRead } = useMarkAsReadNotifications();
  const notificationStore = useNotificationStore();
  const userStore = useUserStore();
  const userId = userStore?.user?._id;

  function handleToggleNotification() {
    setIsOpen(!isOpen);
    notificationStore.addUnreadCount(0);
    markAsRead({});
  }

  useEffect(() => {
    socket.emit('register', userId);
    socket.on('new_notification', (newNotification) => {
      notificationStore.increaseUnreadCount();
      notificationStore.addNewNotification(newNotification);
    });
    return () => {
      socket.off('new_notification');
    };
  }, [userId]);

  return (
    <div className="">
      <NotificationIcon
        unreadCount={notificationStore.unreadCount}
        toggleNotification={handleToggleNotification}
      />

      {isOpen && (
        <NotificationsList
          isLoading={isLoading}
          notifications={notificationStore.notificationList}
          refetch={loadMore}
          hasMore={hasMore}
        />
      )}
    </div>
  );
}
