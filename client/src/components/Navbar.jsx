import React from "react";
import { FaAlignLeft } from "react-icons/fa";
import {
    Logo,
    LogoutContainer,
    ThemeToggle
} from '../components'
import { useDashboardContext } from "../pages/DashboardLayout";
import {useWindowScreenSize} from '../hooks'


export default function Navbar(){
    const {toggleBigSidebar, toggleSmallSidebar} = useDashboardContext()
    const currentSize = useWindowScreenSize()
    const isBigSidebar = ["2xl", "xl", "lg"].includes(currentSize)
   
    return (
        <nav className="w-full flex justify-between px-4 py-6 shadow-sm bg-white dark:bg-zinc-900 border-b dark:border-none">
            <button 
                onClick={isBigSidebar ? toggleBigSidebar : toggleSmallSidebar}
                className="text-blue-600 ml-4"
            >
            <FaAlignLeft size="1.8rem"/>
            </button>
            <div>
                <Logo className="lg:hidden w-36" />
                <h4 className="hidden lg:block text-2xl text-slate-800 dark:text-white">Dashboard</h4>
            </div>
            <div className="flex gap-4">
                <ThemeToggle />
                <LogoutContainer />
            </div>
        </nav>
    )
}