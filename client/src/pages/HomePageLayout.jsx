import React from "react";
import { HomeNavbar } from "../components";
import { Outlet } from "react-router-dom";

export default function HomePageLayout(){
    return (
        <main className="w-full bg-slate-50  dark:bg-zinc-800 min-h-screen">
            <HomeNavbar />
            <div className="">
                <Outlet />
            </div>
        </main>
    )
}