import { createContext, ReactNode, useContext, useState } from "react";
import { useUserStore } from "../store/userStore";
import { User } from "../types";
import { useTheme } from "../hooks/useTheme";

type DashboardContextT = {
  user: User | null;
  theme: string;
  toggleTheme: () => void;
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
  defaultTheme: "light" | "dark";
};

export const DashboardProvider = ({ children, defaultTheme }: Props) => {
  const userStore = useUserStore();
  const user = userStore.user;
  const [showBigSidebar, setShowBigSidebar] = useState(true);
  const [showSmallSidebar, setShowSmallSidebar] = useState(false);
  const { theme, toggleTheme } = useTheme({ defaultTheme: defaultTheme });

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
        theme,
        toggleTheme,
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
      "useDashBoardContext must be used within DashboardLayout component"
    );
  }
  return context;
};
