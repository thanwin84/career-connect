import { useState } from 'react';
import NotificationIcon from './NoficationIcon';
import NotificationsList from './NotificationsList';
import { useGetAllNotifications } from '../hooks/useGetAllNotifications';
import { useGetUnreadCount } from '../hooks/useGetUnreadCount';
import { useNotificationStore } from '../../../lib/store/NotificationStore';
import { useMarkAsReadNotifications } from '../hooks/useMarkAsReadNotifications';

type Props = {
  className?: string;
};

export default function NotificationContainer({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useGetUnreadCount();
  const { isLoading, loadMore, hasMore } = useGetAllNotifications();
  const { markAsRead } = useMarkAsReadNotifications();
  const notificationStore = useNotificationStore();

  function handleToggleNotification() {
    setIsOpen(!isOpen);
    notificationStore.addUnreadCount(0);
    markAsRead({});
  }

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
