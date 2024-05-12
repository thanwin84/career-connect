import React from "react";
import { BsFillSunFill,BsMoonFill  } from "react-icons/bs";
import { useDashboardContext } from "../pages/DashboardLayout";

export default function ThemeToggle(){
    const {theme, toggleTheme} = useDashboardContext()
    
    return (
        <div onClick={toggleTheme} className="cursor-pointer my-auto">
            {theme === 'dark' ? (
                <BsFillSunFill className="text-white"/>
            ): (
                <BsMoonFill className="" />
            )}
        </div>
    )
}