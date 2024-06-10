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
    useNavigate} from 'react-router-dom'
import { 
    BigSidebar, 
    Navbar, 
    SmallSidebar 
} from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

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
    const navigate = useNavigate()
    const [theme, setTheme] = useState(defaultTheme)
    const [showBigSidebar, setShowBigSidebar] = useState(true)
    const [showSmallSidebar, setShowSmallSidebar] = useState(false)
    const data = useLoaderData()
    
    
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
        navigate("/")
        await customFetch.get("/auth/logout")
        toast.success("Log out is successful", {autoClose:2000})
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
            <main className="flex flex-row">
                
                <div className="dark:bg-zinc-900 bg-white h-screen fixed">
                    <SmallSidebar className="lg:hidden xl:hidden 2xl:hidden" />
                    <BigSidebar className="hidden  md:block lg:block xl:block 2xl:block"/> 
                </div>

                <div className={`w-full ${showBigSidebar ? "lg:ml-60 md:ml-60": ""}`}>
                    <Navbar />
                    <div className="bg-slate-50 dark:bg-zinc-800 min-h-screen">
                        <Outlet context={{user}}/>
                    </div>
                </div>
            </main>
        </dashboardContext.Provider>
    )
}

export const useDashboardContext = ()=> useContext(dashboardContext)