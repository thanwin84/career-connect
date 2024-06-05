import React, {useState, useContext, createContext, useEffect} from "react";
import {Outlet} from 'react-router-dom'
import { BigSidebar, Navbar, SmallSidebar } from "../components";

const dashboardContext = createContext()

export default function DashboardLayout({defaultTheme}){
    // temp
    const user = {name: "Than Win"}
    const [theme, setTheme] = useState(defaultTheme)
    const [showBigSidebar, setShowBigSidebar] = useState(true)
    const [showSmallSidebar, setShowSmallSidebar] = useState(false)
    
    
    function toggleTheme(){
        if (theme === "dark"){
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

   
    function toggleBigSidebar(){
        setShowBigSidebar(!showBigSidebar)
    }
    function toggleSmallSidebar(){
        setShowSmallSidebar(!showSmallSidebar)
    }
    async function logoutUser(){
        console.log("log out user")
    }
    
    // for dark theme
    useEffect(()=>{
        document.querySelector('html').classList.remove("light", "dark")
        document.querySelector('html').classList.add(theme)
        localStorage.setItem("themeMode", theme)
    }, [theme])

    return (
        <dashboardContext.Provider value={{
                user,
                theme,
                toggleTheme,
                logoutUser,
                showBigSidebar,
                showSmallSidebar,
                toggleBigSidebar,
                toggleSmallSidebar
            }}>
            <main className="flex flex-row dark:bg-slate-900">
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