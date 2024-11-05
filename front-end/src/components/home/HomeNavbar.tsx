
import LoginAndLogoutContainer from "./LoginAndLogoutContainer";
import HomeNavLinks from "./HomeNavLinks";
import HomeMobileNavbar from "./HomeMobileNavbar";
type Props = {
    isLoggedIn: boolean
}
export default function HomeNavbar({
    isLoggedIn
}: Props){
    
    return (
        <nav className="bg-white dark:bg-zinc-900  flex justify-between border-b border-gray-200 dark:border-none pt-4 px-8">
            <div className="hidden md:flex">
                <p aria-label="career connect logo" className="font-bold text-blue-700 text-xl w-60 text-nowrap">Career Connect</p>
                <HomeNavLinks 
                    isLoggedIn={isLoggedIn}
                    className= "w-2/6 ml-10  font-serif" 
                />
            </div>
            <HomeMobileNavbar className="md:hidden" />
            <LoginAndLogoutContainer 
                className= "font-serif ml-auto md:ml-0" 
            />
        </nav>
    )
}