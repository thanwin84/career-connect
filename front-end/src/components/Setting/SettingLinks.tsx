
import { NavLink } from "react-router-dom";

type Props = {
    className?: string
}
export default function SettingLinks({className}:Props){
    const links = [
        {
            path: ".",
            pathName: "Account",
            id: "account"
        },
        {
            path: "password-and-security",
            pathName: "Password and Security",
            id: "Password and Security"
        }
    ]
    const styles = {
        active: "p-2 bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-slate-100 font-semibold rounded-md shadow-sm",
        current: "p-2 text-slate-800 font-semibold dark:text-slate-200"
    }
    return (
        <div className={`w-full py-2 ${className}`}>
            
            <div className="flex justify-evenly gap-2 bg-white dark:bg-zinc-900 w-full p-2 rounded-md shadow-sm">
                {links.map(link =>{
                    return (
                        <NavLink
                            key = {link.id}
                            to={link.path}
                            className={({isActive})=>{
                                return isActive ? styles.active : styles.current
                            }}
                            end
                        >
                            {link.pathName}
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}