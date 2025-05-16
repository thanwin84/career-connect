import { useState } from 'react';
import { useGetUnreadCount, useMarkAsReadNotifications } from '@/hooks/api';
import { useNotificationStore } from '@/lib/store';
import { NotificationIcon, NotificationsList } from '.';

type Props = {
  className?: string;
};

export default function NotificationContainer({ className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  useGetUnreadCount();
  const { markAsRead } = useMarkAsReadNotifications();
  const notificationStore = useNotificationStore();

  function handleToggleNotification() {
    setIsOpen(!isOpen);
    notificationStore.addUnreadCount(0);
    markAsRead({});
  }

  return (
    <div className={className}>
      <NotificationIcon
        unreadCount={notificationStore.unreadCount}
        toggleNotification={handleToggleNotification}
      />
      {isOpen && <NotificationsList />}
    </div>
  );
}
