import { useCallback, useEffect } from 'react';
import { useUserStore } from '../../../lib/store/userStore';
import socket from '../../../socket';
import { useNotificationStore } from '../../../lib/store/NotificationStore';
import { Notification } from '@/lib/types';

export const useNotification = () => {
  const userStore = useUserStore();
  const notificationStore = useNotificationStore();
  const userId = userStore?.user?._id;

  const handleReconnect = useCallback(() => {
    socket.emit('register', userId);
  }, [userId]);
  const handleNewNotification = useCallback(
    (newNotification: Notification) => {
      notificationStore.increaseUnreadCount();
      notificationStore.addNewNotification(newNotification);
    },
    [notificationStore]
  );
  useEffect(() => {
    if (!userId) {
      return;
    }
    socket.on('connect', () => {
      console.log('a user is connected');
    });
    socket.emit('register', userId);
    socket.on('new_notification', handleNewNotification);
    socket.on('reconnect_attempt', () => {
      console.log('reconnecting');
    });

    socket.on('reconnect', handleReconnect);
    console.log(socket.listeners('reconnect'));

    return () => {
      socket.off('new_notification', handleNewNotification);
      socket.off('reconnect', handleReconnect);
    };
  }, [userId, handleNewNotification, handleReconnect]);
};
