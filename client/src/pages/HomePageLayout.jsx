import  HomeNavbar  from "../components/home/HomeNavbar";
import { Outlet } from "react-router-dom";
import { useMainContext } from "../contexts/MainContext";

export default function HomePageLayout(){
    const {user} = useMainContext()
    const isLoggedIn = user !== null
    return (
        <main className="w-full bg-slate-50  dark:bg-zinc-800 min-h-screen">
            <HomeNavbar isLoggedIn={isLoggedIn} />
            <div className="">
                <Outlet />
            </div>
        </main>
    )
}