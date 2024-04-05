import React, {useState, useContext, createContext} from "react";
import {Outlet} from 'react-router-dom'
import { BigSidebar, Navbar, SmallSidebar } from "../components";

const dashboardContext = createContext()

export default function DashboardLayout(){
    // temp
    const user = {name: "Than Win"}
    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    function toggleDarkTheme(){
        console.log("toggle theme")
    }

    function toggleSidebar(){
        setShowSidebar(!showSidebar)
    }

    async function logoutUser(){
        console.log("log out user")
    }

    return (
        <dashboardContext.Provider value={{
                user,
                showSidebar,
                isDarkTheme,
                toggleDarkTheme,
                toggleSidebar,
                logoutUser
            }}>
            <main className="flex flex-col lg:flex-row">
                <div className="w-auto">
                    <SmallSidebar className="lg:hidden " />
                    <BigSidebar className="hidden lg:block "/>
                </div>
                <div className="w-full">
                    <Navbar/>
                    <div className="">
                        <Outlet />
                    </div>
                </div>
            </main>
        </dashboardContext.Provider>
    )
}

export const useDashboardContext = ()=> useContext(dashboardContext)