import React from "react";
import {
    DropDownContainer
} from "../../components"
import { Link } from "react-router-dom";


export default function LoginAndLogoutContainer({
    isloggedIn=false,
    className
}){
    return (
        <div className={` ${className}`}>
            {isloggedIn ? (
                <DropDownContainer />

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