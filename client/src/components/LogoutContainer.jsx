import React, {useState} from "react"
import { FaUserCircle } from "react-icons/fa"
import { FaCaretDown } from "react-icons/fa"
import { useDashboardContext } from "../pages/DashboardLayout"

export default function LogoutContainer(){
    const [showLogout, setShowLogout] = useState(false)
    const {user, logoutUser} = useDashboardContext()
    
    return (
        <div className="relative">
            <button
                type="button"
                className="px-2 py-1 rounded-md flex gap-2 my-auto  dark:bg-zinc-800 border border-slate-400 dark:border-slate-100 dark:text-slate-100  "
                onClick={()=> setShowLogout(!showLogout)}
            >
                <span className="my-auto">
                    {user.avatar ? (
                        <img src={user.avatar[0]} alt="avatar" className="w-8 h-8 rounded-full" />
                    ): (
                        <FaUserCircle />
                    )}
                </span>

                <span className="my-auto">{user?.name}</span>

                <span className="my-auto">
                    <FaCaretDown />
                </span>
            </button>
            
            <div className="absolute w-full my-2">
                {showLogout && (
                    <button
                        type="button"
                        className="border border-slate-400 dark:border-slate-100 bg-white dark:text-slate-100 dark:bg-zinc-800 text-slate-900 hover:text-blue-800 hover:font-bold dark:hover:text-blue-500  px-4 py-1 rounded-md  w-full"
                        onClick={logoutUser}
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    )
}