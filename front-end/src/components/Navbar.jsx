import React from "react";
import { FaAlignLeft } from "react-icons/fa";
import {Logo} from '../components'
import { useDashboardContext } from "../pages/DashboardLayout";
import {useWindowScreenSize} from '../hooks'
export default function Navbar(){
    const {toggleBigSidebar, toggleSmallSidebar} = useDashboardContext()
    const currentSize = useWindowScreenSize()
    const isBigSidebar = ["2xl", "xl", "lg"].includes(currentSize)
   
    return (
        <nav className="w-full flex justify-between px-4 py-6 shadow-sm">
            <button 
                onClick={isBigSidebar ? toggleBigSidebar : toggleSmallSidebar}
                className="text-blue-600"
            >
            <FaAlignLeft size="1.4rem"/>
            </button>
            <div>
                <Logo className="lg:hidden w-36" />
                <h4 className="hidden lg:block text-xl">dashboard</h4>
            </div>
           <div>
            toggle/logout
           </div>
        </nav>
    )
}