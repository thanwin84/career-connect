import React from "react";
import { Logo } from "../ui";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import { useDashboardContext } from "../../pages/DashboardLayout";

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
        <section className={`w-full p-4  dark:border-none  h-screen ${className}`}>
            <Link
                to="../home"
            >
            <Logo className="w-44 pb-14 pt-4" />
            </Link>
            <NavLinks className="pt-8"  />
        </section>
    )
}