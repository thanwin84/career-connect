import { createContext, ReactNode, useContext, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { User } from '../types';

type DashboardContextT = {
  user: User | null;
  showBigSidebar: boolean;
  showSmallSidebar: boolean;
  toggleBigSidebar: () => void;
  toggleSmallSidebar: () => void;
};

const dashboardContext = createContext<DashboardContextT | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export const DashboardProvider = ({ children }: Props) => {
  const userStore = useUserStore();
  const user = userStore.user;
  const [showBigSidebar, setShowBigSidebar] = useState(true);
  const [showSmallSidebar, setShowSmallSidebar] = useState(false);

  function toggleBigSidebar() {
    setShowBigSidebar(!showBigSidebar);
  }
  function toggleSmallSidebar() {
    setShowSmallSidebar(!showSmallSidebar);
  }

  return (
    <dashboardContext.Provider
      value={{
        user,
        showBigSidebar,
        showSmallSidebar,
        toggleBigSidebar,
        toggleSmallSidebar,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(dashboardContext);
  if (!context) {
    throw new Error(
      'useDashBoardContext must be used within DashboardLayout component'
    );
  }
  return context;
};
