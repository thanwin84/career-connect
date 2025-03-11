import { createContext, ReactNode, useContext, useState } from 'react';

type TabContextType = {
  currentTab: string;
};

const tabContext = createContext<TabContextType | undefined>(undefined);

type Props = {
  tabs: string[];
  defaultTab?: string;
  className?: string;
  children: ReactNode;
  tabFontSize?: string;
};

const Tabs = ({
  tabs,
  defaultTab,
  className,
  children,
  tabFontSize = 'text-lg',
}: Props) => {
  const [currentTab, setCurrentTab] = useState(defaultTab || tabs?.[0]);

  return (
    <div className={`w-full p-5  ${className}`}>
      <tabContext.Provider value={{ currentTab }}>
        <div
          className="flex rounded-sm shadow-sm bg-white bg-black/[0.96]"
          role="tablist"
        >
          {tabs?.map((tab, index) => (
            <button
              role="tab"
              aria-selected={currentTab === tab}
              aria-controls={`panel-${tab}`}
              onClick={() => setCurrentTab(tab)}
              className={`flex-1 ${tabFontSize} px-4 py-2 rounded-md text-center font-semibold m-1 cursor-pointer transition duration-200 ease-in-out ${
                currentTab === tab
                  ? 'bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-slate-300'
                  : 'text-gray-500 dark:text-slate-300'
              }`}
              key={index}
            >
              {tab}
            </button>
          ))}
        </div>
        {children}
      </tabContext.Provider>
    </div>
  );
};

export default Tabs;

export const useTabContext = (fnName: string) => {
  const context = useContext(tabContext);
  if (!context) {
    throw new Error(`${fnName} must be within Tabs`);
  }
  return context;
};
