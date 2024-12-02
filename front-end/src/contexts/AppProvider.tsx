import { createContext, ReactNode, useContext } from "react";
import { useUserStore } from "./userStore";
import { useSettingStore } from "./SettingStore";
import { useProfileStore } from "./ProfileStore";
import { useMyJobsStore } from "./MyJobsStore";

type AppContextType = {
  userStore: ReturnType<typeof useUserStore>;
  settingStore: ReturnType<typeof useSettingStore>;
  profileStore: ReturnType<typeof useProfileStore>;
  myJobStore: ReturnType<typeof useMyJobsStore>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  const user = useUserStore();
  const setting = useSettingStore();
  const profile = useProfileStore();
  const myJobs = useMyJobsStore();

  const store: AppContextType = {
    userStore: user,
    settingStore: setting,
    profileStore: profile,
    myJobStore: myJobs,
  };
  console.log(store);
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
