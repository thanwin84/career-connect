import React, { useEffect } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import {NavLinks, Logo} from '../components'

export default function BigSidebar({className}){
    const {showBigSidebar} = useDashboardContext()

    
    return (
        <div className="">
        {showBigSidebar && <SideBar className={className}/> }
        </div>
    )
}

function SideBar({className}){
    return (
        <section className={`w-full p-4   border-r dark:border-none  h-screen ${className}`}>
            <Logo className="w-52 pb-14 pt-4" />
            <NavLinks className=""  />
        </section>
    )
}