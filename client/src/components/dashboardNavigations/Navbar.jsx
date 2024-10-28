import { FaAlignLeft } from "react-icons/fa";
import {
    Logo,
    ThemeToggle
} from '../ui'
import DropDownContainer from "./DropDownContainer";
import {useWindowScreenSize} from '../../hooks'
import { useDashboardContext } from "../../pages/DashboardLayout";


export default function Navbar(){
    const {
        toggleBigSidebar, 
        toggleSmallSidebar,
        user,
        showSmallSidebar
    } = useDashboardContext()
    const currentSize = useWindowScreenSize()
    const isSmallSidebar = currentSize === 'sm'
   
    return (
        <nav className="w-full flex justify-between px-4 py-4 shadow-sm bg-white dark:bg-zinc-900 border-b dark:border-none">
            <button 
                onClick={isSmallSidebar ?  toggleSmallSidebar: toggleBigSidebar}
                className="text-blue-600 ml-4"
            >
            <FaAlignLeft size="1.8rem"/>
            </button>
            <div>
                <Logo className="lg:hidden w-36" />
                <h4 className="hidden lg:block text-2xl text-slate-800 dark:text-white">Dashboard</h4>
            </div>
            <div className="flex gap-4">
                <ThemeToggle />
                <DropDownContainer
                 user={user}
                 showSmallSidebar={showSmallSidebar}
                />
            </div>
        </nav>
    )
}