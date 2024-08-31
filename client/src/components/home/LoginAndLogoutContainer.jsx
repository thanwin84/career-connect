import React from "react";
import {
    DropDownContainer
} from "../../components"
import { Link } from "react-router-dom";
import { useMainContext } from "../../contexts/MainContext";


export default function LoginAndLogoutContainer({
    className
}){
    const {user, logout} = useMainContext()
    const isLoggedIn = user !== null
    return (
        <div className={` ${className}`}>
            {isLoggedIn ? (
                <DropDownContainer
                    user={user}
                    logoutUser={logout}
                    className="pb-2"
                 />

            ): (
                <Link
                to="/login"
                className="font-semibold text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100"
            >
                LOGIN
            </Link>
            )}
        </div>
    )
}