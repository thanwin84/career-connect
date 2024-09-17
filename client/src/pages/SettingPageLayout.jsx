import { SettingLinks } from "../components/Setting";
import { Outlet, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

export const loader = async()=>{
    try {
        const {data} = await customFetch("/users/current-user")
        return data
    } catch (error) {
        return error
    }
}



export default function SettingPageLayout(){
    const userData = useLoaderData()
   
    return (
        <div className="w-full bg-white dark:bg-zinc-800">
            <h3 className="text-2xl font-semibold px-2 py-4 text-slate-800 dark:text-slate-100">Setting</h3>
            <SettingLinks className= "px-4" />
            <div className="px-4 lg:w-3/5">
                <Outlet context={{userData}}/>
            </div>
        </div>
    )
}

