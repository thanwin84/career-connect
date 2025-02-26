import { produce } from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Notification } from '../types';
type State = {
  notificationList: Notification[];
  unreadCount: number;
};
type Store = State & {
  addNotifications: (notifications: Notification[]) => void;
  addNewNotification: (notification: Notification) => void;
  addUnreadCount: (count: number) => void;
  increaseUnreadCount: () => void;
};

const initialState: State = {
  notificationList: [],
  unreadCount: 0,
};

export const useNotificationStore = create<Store>()(
  devtools((set) => ({
    ...initialState,
    addNotifications: (notifications: Notification[]) =>
      set(
        produce((draft) => {
          draft.notificationList = notifications;
        })
      ),
    addNewNotification: (notification: Notification) =>
      set(
        produce((draft) => {
          draft.notificationList.unshift(notification);
        })
      ),
    addUnreadCount: (count: number) =>
      set(
        produce((draft) => {
          draft.unreadCount = count;
        })
      ),
    increaseUnreadCount: () =>
      set(
        produce((draft) => {
          draft.unreadCount++;
        })
      ),
  }))
);
