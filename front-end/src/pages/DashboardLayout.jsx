import React, {useState, useContext, createContext} from "react";
import {Outlet} from 'react-router-dom'
import { BigSidebar, Navbar, SmallSidebar } from "../components";

const dashboardContext = createContext()

export default function DashboardLayout(){
    // temp
    const user = {name: "Than Win"}
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const [showBigSidebar, setShowBigSidebar] = useState(true)
    const [showSmallSidebar, setShowSmallSidebar] = useState(false)
    
    
    function toggleDarkTheme(){
        console.log("toggle theme")
    }

   
    // testing
    
    function toggleBigSidebar(){
        setShowBigSidebar(!showBigSidebar)
    }
    function toggleSmallSidebar(){
        setShowSmallSidebar(!showSmallSidebar)
    }
    async function logoutUser(){
        console.log("log out user")
    }
    

    return (
        <dashboardContext.Provider value={{
                user,
                isDarkTheme,
                toggleDarkTheme,
                logoutUser,
                showBigSidebar,
                showSmallSidebar,
                toggleBigSidebar,
                toggleSmallSidebar
            }}>
            <main className="flex flex-row">
                <div className="">
                     <SmallSidebar className="lg:hidden xl:hidden 2xl:hidden" />
                    <BigSidebar className="hidden  md:block lg:block xl:block 2xl:block"/> 
                    
                </div>

                <div className="w-full">
                    <Navbar />
                    <div className="">
                        <Outlet />
                    </div>
                </div>
            </main>
        </dashboardContext.Provider>
    )
}

export const useDashboardContext = ()=> useContext(dashboardContext)