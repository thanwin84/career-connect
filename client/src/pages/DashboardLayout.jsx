import React, {
    useState, 
    useContext, 
    createContext, 
    useEffect
} from "react";
import {
    Outlet, 
    redirect, 
    useLoaderData,
    } from 'react-router-dom'
import { 
    BigSidebar, 
    ModalContainer, 
    Navbar, 
    SmallSidebar 
} from "../components";
import customFetch from "../utils/customFetch";
import { useWindowScreenSize } from "../hooks";

export const loader = async()=>{
    try {
       const {data}= await customFetch("/users/current-user")
       return data
    } catch (error) {
        return redirect("/")
    }
}

const dashboardContext = createContext()

export default function DashboardLayout({defaultTheme}){
    
    const user = useLoaderData()
    const currentSize = useWindowScreenSize()
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
                showBigSidebar,
                showSmallSidebar,
                toggleBigSidebar,
                toggleSmallSidebar
            }}>
            <div className="flex flex-row ">
                
                <aside className="dark:bg-zinc-900 h-screen fixed top-0 hidden lg:block md:block">
                    <BigSidebar className=""/> 
                </aside>

                <div className={`w-full  ${showBigSidebar ? 'lg:ml-52 md:ml-52': ""}`}>
                    <header>
                        <Navbar />
                    </header>
                    <main className="bg-slate-50 dark:bg-zinc-800 min-h-screen">
                        <Outlet context={{user}}/>
                    </main>
                </div>
                {currentSize === 'sm' && showSmallSidebar && (
                    <ModalContainer className= "w-3/5" modelClassName="">
                    <SmallSidebar onClick={toggleSmallSidebar} />
                </ModalContainer>
                )}
            </div>
        </dashboardContext.Provider>
    )
}

export const useDashboardContext = ()=> useContext(dashboardContext)