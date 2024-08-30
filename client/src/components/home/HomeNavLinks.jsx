import React from "react";
import { NavLink } from "react-router-dom";

export default function HomeNavLinks({className, isLoggedIn}){
    const links = [
        {
            name: "FIND JOBS",
            path: "."
        },
        {
            name: 'DASHBOARD',
            path: "/dashboard"
        }
        
    ]
    const styles = {
        active: "dark:text-slate-100 font-medium border-b-2 border-blue-700 dark:border-blue-500 pb-4",
        normal: "dark:text-slate-200"
    }
    return (
        <div className={`w-full flex gap-6  ${className}`}>
           {links.map(link =>{
            if (!isLoggedIn && link.name === "DASHBOARD"){
                return
            }
            else {
                return (
                    <NavLink
                    key={link.name}
                    className={({isActive, isPending})=> isActive? styles.active: styles.normal}
                    >
                        {link.name}
                    </NavLink>
                )
            }
           })}
        </div>
    )
}