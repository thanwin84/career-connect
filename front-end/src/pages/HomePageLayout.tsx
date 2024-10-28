import  HomeNavbar  from "../components/home/HomeNavbar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppProvider";
import { useUserInformation } from "../api/UserApi";
import { LoadingPage } from "../components/ui";

export default function HomePageLayout(){
    const {userStore} = useAppContext()
    const isLoggedIn = userStore.state.isLoggedIn
    const {isLoading} = useUserInformation()
    
    if (isLoading){
        return <LoadingPage/>
    }
    return (
        <main className="w-full bg-slate-50  dark:bg-zinc-800 min-h-screen">
            <HomeNavbar isLoggedIn={isLoggedIn} />
            <div className="">
                <Outlet />
            </div>
        </main>
    )
}