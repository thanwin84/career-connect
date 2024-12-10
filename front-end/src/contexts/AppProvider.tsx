import { createContext, ReactNode, useContext } from "react";

type AppContextType = {};

const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  const store: AppContextType = {};

  return (
    <AppContext.Provider value={{ ...store }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("use useAppContext within App");
  }
  return context;
};
