
import { useAppContext } from "../../contexts/AppProvider";
import DropDownContainer from "../dashboardNavigations/DropDownContainer";
import { Link } from "react-router-dom";

type Props = {
    className?: string
}

export default function LoginAndLogoutContainer({
    className
}: Props){
   
    const {userStore} = useAppContext()
    const isLoggedIn =  userStore.state.isLoggedIn
    return (
        <div className={` ${className}`}>
            {isLoggedIn ? (
                <DropDownContainer
                    className="pb-2"
                 />

            ): (
                <Link
                to="/login"
                className="font-semibold text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100"
            >
                LOGIN
            </Link>
            )}
        </div>
    )
}