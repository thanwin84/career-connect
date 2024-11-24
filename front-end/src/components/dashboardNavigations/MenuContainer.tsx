import  {useState} from "react"
import { FaUserCircle } from "react-icons/fa"
import { FaCaretDown } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useAppContext } from "../../contexts/AppProvider"
import {useLogout} from '../../api/UserApi'

type Props = {
    showSmallSidebar?: boolean
    className?: string
}

export default function MenuContainer({
    showSmallSidebar,
    className
}:Props){
    const [showDropDown, setShowDropDown] = useState(false)
    const {logout} = useLogout()
    const navigate = useNavigate()
    const {userStore} = useAppContext()
    async function handleLogout(){
        logout({})
        navigate("/")
    }
    
    return (
        <div 
            className={`relative w-40 ${showSmallSidebar ? "": "relative"} ${className}`}
        >
            <button
                type="button"
                className="w-full px-2 py-1 rounded-md flex justify-between gap-2 my-auto  dark:bg-zinc-800 border border-slate-400 dark:border-slate-100 dark:text-slate-100  "
                onClick={()=> setShowDropDown(!showDropDown)}
                aria-label={showDropDown ? "close user options dropdown": "Open user options dropdown"}
                aria-haspopup="true"
                aria-expanded={showDropDown}
                aria-controls="dropdown-menu"
            >
                <span className="my-auto">
                    {userStore.state.user && userStore.state.user.avatar ? (
                        <img src={userStore.state.userAvatar as string} alt="avatar" className="w-8 h-8 rounded-full" />
                    ): (
                        <FaUserCircle />
                    )}
                </span>

                <span className="my-auto">{userStore.state.user?.name}</span>

                <span className="my-auto">
                    <FaCaretDown />
                </span>
            </button>
            
            {showDropDown && (
                    <ul 
                        id="dropdown-menu"
                        role='menu'
                        aria-label="user options menu"
                        className="grid gap-2 w-full bg-white dark:bg-zinc-800 border border-slate-300 rounded-md p-1 absolute left-0 mt-2 z-10"

                    >
                        <li
                            role="menuitem"
                            className="text-center"
                        >
                            <Link
                                to="/dashboard/setting"
                                className="w-full  text-center bg-white dark:text-slate-100 dark:bg-zinc-800 text-slate-900 hover:text-blue-800 hover:font-bold dark:hover:text-blue-500  px-4 py-1 rounded-md"
                                onClick={()=>setShowDropDown(false)}
                            >
                                Setting
                            </Link>
                        </li>
                        <li 
                            role="menuitem"
                        >
                            <button
                                type="button"
                                className="mb-2 bg-white dark:text-slate-100 dark:bg-zinc-800 text-slate-900 hover:text-blue-800 hover:font-bold dark:hover:text-blue-500  px-4 py-1 rounded-md  w-full"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
        </div>
    )
}