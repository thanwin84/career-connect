import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

export default function NavLinks({className}){
    const {showSidebar, toggleSidebar} = useDashboardContext()
    const linkStyle = `flex gap-6 text-gray-700 text-xl  mb-4 hover:text-blue-600 ${className}`
    const activeStyle = `flex gap-6 text-blue-700 text-xl  mb-4 hover:text-blue-600 ${className}`
    return (
        <div>
            {links.map(link =>{
                const {text, path, icon} = link
                return (
                    <NavLink
                        className= {({isActive})=>{
                            console.log(isActive)
                            return isActive ? activeStyle: linkStyle
                        }}
                        to = {path}
                        key={text}
                    >
                        <span className="my-auto">{icon}</span>
                        <span className="">{text}</span>
                    </NavLink>
                )
            })}
        </div>
    )
}