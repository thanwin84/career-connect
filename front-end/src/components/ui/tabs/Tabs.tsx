import { createContext, ReactNode, useContext, useState } from "react";

type TabContextType = {
    currentTab: string
}

const tabContext = createContext<TabContextType|undefined>(undefined)

type Props = {
    tabs: string[]
    defaultTab?: string
    className?: string
    children: ReactNode
}

const Tabs = ({
    tabs,
    defaultTab,
    className,
    children
}:Props) => {
    const [currentTab, setCurrentTab] = useState(defaultTab || tabs?.[0])
   
  return (
    <div className={`w-full p-5 ${className}`}>
        <tabContext.Provider value={{currentTab}}>
        <ul 
            className="flex rounded-sm shadow-sm dark:bg-zinc-900"
            role="tabList"
        >
            {tabs?.map((tab, index)=>(
                <li
                    tabIndex={0}
                    aria-selected={currentTab === tab}
                    onClick={()=>setCurrentTab(tab)}
                    className={`flex-1 text-lg px-4 py-2 rounded-md text-center font-semibold m-1 cursor-pointer transition duration-200 ease-in-out ${currentTab === tab ? "bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-slate-300": "text-gray-500 dark:text-slate-300"}`}
                    key={index}
                >
                    {tab}
                </li>
            ))}
        </ul>
        {children}
        </tabContext.Provider>
    </div>
  );
};

export default Tabs;

export const useTabContext = (fnName:string)=>{
    const context = useContext(tabContext)
    if (!context) {
        throw new Error(`${fnName} must be within Tabs`)
    }
    return context
}
