import  {useState} from "react";
import { IoMenu } from "react-icons/io5";
import HomeMobileNavbarLinks from "./HomeMobileNavbarLinks";
import { SlideOpen } from "../ui";
export default function HomeMobileNavbar({
    className
}){
    const [openMobileSideBar, setOpenMobileSideBar] = useState(false)
    function toggleMobileSideBar(){
        setOpenMobileSideBar(!openMobileSideBar)
    }
    
    return (
        <div className={` ${className}`}>
            <button
                onClick={toggleMobileSideBar}
                className="my-auto text-3xl text-blue-500"
            >
                <IoMenu />
            </button>
            
                <SlideOpen
                    closeFn={toggleMobileSideBar}
                    isOpen={openMobileSideBar} 
                    position="left"
                    className="w-3/6" 
                >
                    {<HomeMobileNavbarLinks closeFn={toggleMobileSideBar} />}
                </SlideOpen>
            
        </div>
    )
}