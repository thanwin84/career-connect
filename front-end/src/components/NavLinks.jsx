import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useWindowScreenSize } from "../hooks";

export default function NavLinks({className, isSmallSidebar}){
    const {toggleSmallSidebar} = useDashboardContext()
    
    const linkStyle = `flex gap-6 text-gray-700 dark:text-white text-xl  mb-4 hover:text-blue-600 ${className}`
    const activeStyle = `flex gap-6 text-blue-700 text-xl  mb-4 hover:text-blue-600 ${className}`
    return (
        <div>
            {links.map(link =>{
                const {text, path, icon} = link
                return (
                    <NavLink
                        className= {({isActive})=>{
                            return isActive ? activeStyle: linkStyle
                        }}
                        onClick={isSmallSidebar ? toggleSmallSidebar: null}
                        to = {path}
                        key={text}
                        end
                    >
                        <span className="my-auto">{icon}</span>
                        <span className="">{text}</span>
                    </NavLink>
                )
            })}
        </div>
    )
}