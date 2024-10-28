
import {links} from "../../config/HomeLinks";
import { NavLink } from "react-router-dom";
import { Logo } from "../ui";
import { CrossIcon } from "../../utils/Icons";


export default function HomeMobileNavbarLinks({
    closeFn
}){
    
    const styles = {
        active: "dark:text-slate-100 font-medium  text-blue-500",
        normal: "dark:text-slate-200"
    }
    return (
        <nav className="px-4 h-screen">
            <div className="flex justify-between">
                <Logo className="w-36 mt-5" />
                <button
                    onClick={closeFn}
                    className="self-end  text-gray-400 hover:text-gray-600 text-xl"
                >
                    <CrossIcon/>
                </button>
            </div>
            <span className="block border-b mt-10"></span>
            <ul className="flex flex-col gap-4 pt-14">
                {links.map(link =>(
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({isActive, isPending})=>{
                            return isActive? styles.active: styles.normal
                        }}
                        onClick={closeFn}
                    >
                    {link.name}
                    </NavLink>
                ))}
            </ul>
            
        </nav>
    )
}