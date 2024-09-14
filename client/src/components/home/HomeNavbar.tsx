import React from "react";
import LoginAndLogoutContainer from "./LoginAndLogoutContainer";
import HomeNavLinks from "./HomeNavLinks";
export default function HomeNavbar({
    isLoggedIn
}){
    return (
        <nav className="bg-white dark:bg-zinc-900  flex justify-between border-b border-gray-200 dark:border-none pt-4 px-8">
            <p className="font-bold text-blue-700 text-xl w-60">Career Connect</p>
            <HomeNavLinks 
                isLoggedIn={isLoggedIn}
                className= "w-2/6 ml-10 font-serif" 
            />
            <LoginAndLogoutContainer 
                className= "font-serif" />
        </nav>
    )
}