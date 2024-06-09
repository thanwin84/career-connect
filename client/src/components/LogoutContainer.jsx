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
                className="flex gap-2 my-auto bg-blue-500 text-white px-2 py-1 rounded-md"
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
                        className="bg-blue-500 text-white px-4 py-1 rounded-md  w-full"
                        onClick={logoutUser}
                    >
                        logout
                    </button>
                )}
            </div>
        </div>
    )
}