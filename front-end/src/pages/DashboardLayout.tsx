
import  {
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
    Navbar, 
    SmallSidebar 
} from "../components/dashboardNavigations";
import { ModalContainer } from "../components/ui";
import { useWindowScreenSize } from "../hooks";
import { getUserInformationRequest } from "../apiRequest";
import { useAppContext } from "../contexts/AppProvider";
import { User } from "../types";

export const loader = async()=>{
    try {
       const response= await getUserInformationRequest()
       return response
    } catch (error) {
        return redirect("/")
    }
}

type DashboardContextT = {
    user:User
    theme: string
    toggleTheme: ()=> void
    showBigSidebar: boolean
    showSmallSidebar: boolean
    toggleBigSidebar: ()=> void
    toggleSmallSidebar: ()=> void

}

const dashboardContext = createContext<DashboardContextT|undefined>(undefined)

type Props = {
    className?: string
    defaultTheme:string
}


export default function DashboardLayout({defaultTheme}:Props){
    
    const user = useLoaderData() as User
    const {userStore} = useAppContext()
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
        const htmlElement = document.querySelector('html')
        if (htmlElement){
            htmlElement.classList.remove("light", "dark")
            htmlElement.classList.add(theme)
        }
        localStorage.setItem("themeMode", theme)
        if (user){
            userStore.actions.addUser(user)
        }

    }, [theme, user])

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

export const useDashboardContext = ()=>{
    const context = useContext(dashboardContext)
    if (!context){
        throw new Error("useDashBoardContext must be used within DashboardLayout component")
    }
    return context
}