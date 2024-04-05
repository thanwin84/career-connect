import React from "react";
import { FaAlignLeft } from "react-icons/fa";
import {Logo} from '../components'
import { useDashboardContext } from "../pages/DashboardLayout";

export default function Navbar(){
    const {toggleSidebar, showSidebar} = useDashboardContext()
    
    return (
        <nav className="w-full flex justify-between px-4 py-6 shadow-sm">
            <button 
                onClick={toggleSidebar}
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