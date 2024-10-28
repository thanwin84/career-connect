import { BsFillSunFill,BsMoonFill  } from "react-icons/bs";
import { useDashboardContext } from "../../pages/DashboardLayout";



export default function ThemeToggle(){
    const {theme, toggleTheme} = useDashboardContext()
    
    return (
        <div onClick={toggleTheme} className="cursor-pointer my-auto dark:text-white">
            {theme === 'dark' ? (
                <BsFillSunFill className=""/>
            ): (
                <BsMoonFill className="" />
            )}
        </div>
    )
}