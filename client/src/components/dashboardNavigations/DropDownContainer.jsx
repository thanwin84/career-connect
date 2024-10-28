import  {useState} from "react"
import { FaUserCircle } from "react-icons/fa"
import { FaCaretDown } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useMainContext } from "../../contexts/MainContext"

export default function DropDownContainer({
    user,
    showSmallSidebar,
    className
}){
    const [showDropDown, setShowDropDown] = useState(false)
    const {logout} = useMainContext()
    const navigate = useNavigate()
    async function handleLogout(){
        logout()
        navigate("/")
    }
    
    return (
        <div className={`relative w-40 ${showSmallSidebar ? "": "relative"} ${className}`}>
            <button
                type="button"
                className="w-full px-2 py-1 rounded-md flex justify-between gap-2 my-auto  dark:bg-zinc-800 border border-slate-400 dark:border-slate-100 dark:text-slate-100  "
                onClick={()=> setShowDropDown(!showDropDown)}
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
            
            <div className={`w-full z-10 mt-2  ${showSmallSidebar? "": "absolute"}`}>
                {showDropDown && (
                    <div className="grid gap-2 w-full bg-white dark:bg-zinc-800 border border-slate-300 rounded-md">
                        
                        <Link
                            to="/dashboard/setting"
                            className="w-full  text-center bg-white dark:text-slate-100 dark:bg-zinc-800 text-slate-900 hover:text-blue-800 hover:font-bold dark:hover:text-blue-500  px-4 py-1 rounded-md"
                            onClick={()=>setShowDropDown(false)}
                        >
                            Setting
                        </Link>
                        <button
                            type="button"
                            className="mb-2 bg-white dark:text-slate-100 dark:bg-zinc-800 text-slate-900 hover:text-blue-800 hover:font-bold dark:hover:text-blue-500  px-4 py-1 rounded-md  w-full"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}